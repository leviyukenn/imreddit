import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { isAuth } from 'src/guards/isAuth';
import { CommunityResponse, CreateCommunityInput } from './community.dto';
import { Community } from './community.entity';
import { CommunityService } from './community.service';

@Resolver(Community)
export class CommunityResolver {
  constructor(private readonly communityService: CommunityService) {}

  @Mutation((returns) => CommunityResponse)
  @UseGuards(isAuth)
  async createCommunity(
    @Args('createCommunityInput') createCommunityInput: CreateCommunityInput,
    @Context() { req }: { req: Request },
  ) {
    const community = await this.communityService.findByName(
      createCommunityInput.name,
    );

    if (community) {
      return {
        errors: [
          {
            field: 'name',
            message: 'That community name is already taken',
          },
        ],
      };
    }

    return {
      community: this.communityService.createCommunity(
        createCommunityInput,
        req.session.userId!,
      ),
    };
  }

  @Query((returns) => [Community], { name: 'communities' })
  @UseGuards(isAuth)
  async getCommunities(
    @Args('cursor', { nullable: true }) cursor: string,
    @Context() { req }: { req: Request },
  ): Promise<Community[]> {
    console.log('getCommunities');
    const communities = await this.communityService.findByUserId(
      req.session.userId!,
    );

    return communities;
  }
}