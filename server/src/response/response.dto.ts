import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

@ObjectType()
export class Response {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
