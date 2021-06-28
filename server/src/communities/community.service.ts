import { Injectable } from '@nestjs/common';
import { CommunityRole, Role } from 'src/role/role.entity';
import { Connection } from 'typeorm';
import { CreateCommunityInput } from './community.dto';
import { Community } from './community.entity';

@Injectable()
export class CommunityService {
  constructor(private connection: Connection) {}

  async createCommunity(
    createCommunityInput: CreateCommunityInput,
    userId: string,
  ): Promise<Community | undefined> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (createCommunityInput.topicIds.length === 0) {
        throw new Error('Topics are required.');
      }
      const newCommunity = await Community.create({
        ...createCommunityInput,
        topics: createCommunityInput.topicIds.map((topicId) => {
          return {
            id: topicId,
          };
        }),
      });

      const savedCommunity = await queryRunner.manager.save(newCommunity);

      const newRole = await Role.create({
        userId,
        communityId: savedCommunity.id,
        role: CommunityRole.MODERATOR,
      });

      await queryRunner.manager.save(newRole);

      await queryRunner.commitTransaction();
      const community = Community.findOne(newCommunity.id, {
        relations: ['topics'],
      });
      return community;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async findByName(name: string) {
    return Community.findOne({ name });
  }
}
