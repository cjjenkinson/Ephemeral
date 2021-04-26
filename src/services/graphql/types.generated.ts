export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  modifiedAt: Scalars['DateTime'];
  user: User;
};

export type CommentListRelationFilter = {
  every?: Maybe<CommentWhereInput>;
  none?: Maybe<CommentWhereInput>;
  some?: Maybe<CommentWhereInput>;
};

export type CommentWhereInput = {
  AND?: Maybe<Array<CommentWhereInput>>;
  NOT?: Maybe<Array<CommentWhereInput>>;
  OR?: Maybe<Array<CommentWhereInput>>;
  body?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  isDeleted?: Maybe<BoolFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  submissionTrackFeedback?: Maybe<SubmissionTrackFeedbackListRelationFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type CreateStackInput = {
  commentBody: Scalars['String'];
  description: Scalars['String'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type CreateSubmissionTrackFeedbackTemplateInput = {
  alignmentRating: Scalars['Int'];
  color?: Maybe<Scalars['String']>;
  commentBody: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  label: Scalars['String'];
  projectId: Scalars['String'];
};


export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type DeclineSubmissionTrackInput = {
  alignmentRating?: Maybe<Scalars['Int']>;
  commentBody?: Maybe<Scalars['String']>;
  submissionFeedbackTemplateId?: Maybe<Scalars['String']>;
  submissionTrackId: Scalars['String'];
};

export type DeleteTrackByKeyResponse = {
  __typename?: 'DeleteTrackByKeyResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type EnumSubmissionReviewStateFilter = {
  equals?: Maybe<SubmissionReviewState>;
  in?: Maybe<Array<SubmissionReviewState>>;
  not?: Maybe<NestedEnumSubmissionReviewStateFilter>;
  notIn?: Maybe<Array<SubmissionReviewState>>;
};

export type EnumSubmissionTrackInteractionEventFilter = {
  equals?: Maybe<SubmissionTrackInteractionEvent>;
  in?: Maybe<Array<SubmissionTrackInteractionEvent>>;
  not?: Maybe<NestedEnumSubmissionTrackInteractionEventFilter>;
  notIn?: Maybe<Array<SubmissionTrackInteractionEvent>>;
};

export type EnumSubmissionTrackReviewStateFilter = {
  equals?: Maybe<SubmissionTrackReviewState>;
  in?: Maybe<Array<SubmissionTrackReviewState>>;
  not?: Maybe<NestedEnumSubmissionTrackReviewStateFilter>;
  notIn?: Maybe<Array<SubmissionTrackReviewState>>;
};

export type EnumTrackProcessingStateFilter = {
  equals?: Maybe<TrackProcessingState>;
  in?: Maybe<Array<TrackProcessingState>>;
  not?: Maybe<NestedEnumTrackProcessingStateFilter>;
  notIn?: Maybe<Array<TrackProcessingState>>;
};

export type EnumUserRoleFilter = {
  equals?: Maybe<UserRole>;
  in?: Maybe<Array<UserRole>>;
  not?: Maybe<NestedEnumUserRoleFilter>;
  notIn?: Maybe<Array<UserRole>>;
};

export type EnumUserTypeFilter = {
  equals?: Maybe<UserType>;
  in?: Maybe<Array<UserType>>;
  not?: Maybe<NestedEnumUserTypeFilter>;
  notIn?: Maybe<Array<UserType>>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFeedbackTemplate?: Maybe<SubmissionTrackFeedbackTemplate>;
  createGuestUser?: Maybe<User>;
  createProject?: Maybe<Project>;
  createStack?: Maybe<Stack>;
  createStripeCheckoutBillingPortalUrl?: Maybe<Scalars['String']>;
  createStripeCheckoutSession?: Maybe<Scalars['String']>;
  createSubmissionTrackInteraction?: Maybe<SubmissionTrackInteraction>;
  declineSubmissionTrack?: Maybe<SubmissionTrack>;
  deleteTrackByKey?: Maybe<DeleteTrackByKeyResponse>;
  inviteToProject?: Maybe<Scalars['Boolean']>;
  moveSubmissionTrack?: Maybe<SubmissionTrack>;
  processTrackUploads?: Maybe<ProcessTrackUploadsResponse>;
  removeUserFromProject?: Maybe<Project>;
  sendSubmission?: Maybe<Submission>;
  shortlistSubmissionTrack?: Maybe<SubmissionTrack>;
  startTrackUpload?: Maybe<StartTrackUploadResponse>;
  updateAsBusinessUser?: Maybe<User>;
  updateFeedbackTemplate?: Maybe<SubmissionTrackFeedbackTemplate>;
  updateFeedbackTemplateAsDefault?: Maybe<SubmissionTrackFeedbackTemplate>;
  updateStack?: Maybe<Stack>;
  updateTrack?: Maybe<Track>;
  updateUser?: Maybe<User>;
  upsertUser?: Maybe<User>;
};


export type MutationCreateFeedbackTemplateArgs = {
  input: CreateSubmissionTrackFeedbackTemplateInput;
};


export type MutationCreateGuestUserArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  name: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
};


export type MutationCreateStackArgs = {
  input: CreateStackInput;
};


export type MutationCreateStripeCheckoutBillingPortalUrlArgs = {
  projectId: Scalars['String'];
};


export type MutationCreateStripeCheckoutSessionArgs = {
  plan: PaidPlan;
  projectId: Scalars['String'];
};


export type MutationCreateSubmissionTrackInteractionArgs = {
  input: SubmissionTrackInteractionInput;
};


export type MutationDeclineSubmissionTrackArgs = {
  input: DeclineSubmissionTrackInput;
};


export type MutationDeleteTrackByKeyArgs = {
  trackKey: Scalars['String'];
};


export type MutationInviteToProjectArgs = {
  email: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationMoveSubmissionTrackArgs = {
  stackId: Scalars['String'];
  submissionTrackId: Scalars['String'];
};


export type MutationProcessTrackUploadsArgs = {
  input: ProcessTrackUploadInput;
};


export type MutationRemoveUserFromProjectArgs = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationSendSubmissionArgs = {
  input: SendSubmissionInput;
};


export type MutationShortlistSubmissionTrackArgs = {
  input: ShortlistSubmissionTrackInput;
};


export type MutationStartTrackUploadArgs = {
  input: StartTrackUploadInput;
};


export type MutationUpdateAsBusinessUserArgs = {
  id: Scalars['String'];
};


export type MutationUpdateFeedbackTemplateArgs = {
  id: Scalars['String'];
  input: UpdateSubmissionTrackFeedbackTemplateInput;
};


export type MutationUpdateFeedbackTemplateAsDefaultArgs = {
  defaultFeedbackTemplateId: Scalars['String'];
  updatableFeedbackTemplateId: Scalars['String'];
};


export type MutationUpdateStackArgs = {
  id: Scalars['String'];
  input: UpdateStackInput;
};


export type MutationUpdateTrackArgs = {
  id: Scalars['String'];
  input: UpdateTrackInput;
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};


export type MutationUpsertUserArgs = {
  input?: Maybe<UpsertUserInput>;
};

export type NestedBoolFilter = {
  equals?: Maybe<Scalars['Boolean']>;
  not?: Maybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableFilter>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumSubmissionReviewStateFilter = {
  equals?: Maybe<SubmissionReviewState>;
  in?: Maybe<Array<SubmissionReviewState>>;
  not?: Maybe<NestedEnumSubmissionReviewStateFilter>;
  notIn?: Maybe<Array<SubmissionReviewState>>;
};

export type NestedEnumSubmissionTrackInteractionEventFilter = {
  equals?: Maybe<SubmissionTrackInteractionEvent>;
  in?: Maybe<Array<SubmissionTrackInteractionEvent>>;
  not?: Maybe<NestedEnumSubmissionTrackInteractionEventFilter>;
  notIn?: Maybe<Array<SubmissionTrackInteractionEvent>>;
};

export type NestedEnumSubmissionTrackReviewStateFilter = {
  equals?: Maybe<SubmissionTrackReviewState>;
  in?: Maybe<Array<SubmissionTrackReviewState>>;
  not?: Maybe<NestedEnumSubmissionTrackReviewStateFilter>;
  notIn?: Maybe<Array<SubmissionTrackReviewState>>;
};

export type NestedEnumTrackProcessingStateFilter = {
  equals?: Maybe<TrackProcessingState>;
  in?: Maybe<Array<TrackProcessingState>>;
  not?: Maybe<NestedEnumTrackProcessingStateFilter>;
  notIn?: Maybe<Array<TrackProcessingState>>;
};

export type NestedEnumUserRoleFilter = {
  equals?: Maybe<UserRole>;
  in?: Maybe<Array<UserRole>>;
  not?: Maybe<NestedEnumUserRoleFilter>;
  notIn?: Maybe<Array<UserRole>>;
};

export type NestedEnumUserTypeFilter = {
  equals?: Maybe<UserType>;
  in?: Maybe<Array<UserType>>;
  not?: Maybe<NestedEnumUserTypeFilter>;
  notIn?: Maybe<Array<UserType>>;
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntNullableFilter>;
  notIn?: Maybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export enum PaidPlan {
  Pro = 'pro'
}

export type ProcessTrackUploadInput = {
  trackIds: Scalars['String'];
};

export type ProcessTrackUploadsResponse = {
  __typename?: 'ProcessTrackUploadsResponse';
  success: Scalars['Boolean'];
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  previousLabels?: Maybe<Scalars['String']>;
  user: User;
};

export type ProfileWhereInput = {
  AND?: Maybe<Array<ProfileWhereInput>>;
  NOT?: Maybe<Array<ProfileWhereInput>>;
  OR?: Maybe<Array<ProfileWhereInput>>;
  bio?: Maybe<StringNullableFilter>;
  city?: Maybe<StringNullableFilter>;
  country?: Maybe<StringNullableFilter>;
  id?: Maybe<IntFilter>;
  previousLabels?: Maybe<StringNullableFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type Project = {
  __typename?: 'Project';
  feedbackTemplates: Array<SubmissionTrackFeedbackTemplate>;
  id: Scalars['String'];
  name: Scalars['String'];
  paidPlan?: Maybe<PaidPlan>;
  slug: Scalars['String'];
  stacks: Array<Stack>;
  submissionTracks: Array<SubmissionTrack>;
  submissions: Array<Submission>;
  users: Array<User>;
};


export type ProjectFeedbackTemplatesArgs = {
  after?: Maybe<SubmissionTrackFeedbackTemplateWhereUniqueInput>;
  before?: Maybe<SubmissionTrackFeedbackTemplateWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type ProjectStacksArgs = {
  after?: Maybe<StackWhereUniqueInput>;
  before?: Maybe<StackWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type ProjectSubmissionTracksArgs = {
  after?: Maybe<SubmissionTrackWhereUniqueInput>;
  before?: Maybe<SubmissionTrackWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SubmissionTrackOrderByInput>>;
  where?: Maybe<SubmissionTrackWhereInput>;
};


export type ProjectSubmissionsArgs = {
  after?: Maybe<SubmissionWhereUniqueInput>;
  before?: Maybe<SubmissionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SubmissionOrderByInput>>;
  where?: Maybe<SubmissionWhereInput>;
};


export type ProjectUsersArgs = {
  after?: Maybe<UserWhereUniqueInput>;
  before?: Maybe<UserWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ProjectListRelationFilter = {
  every?: Maybe<ProjectWhereInput>;
  none?: Maybe<ProjectWhereInput>;
  some?: Maybe<ProjectWhereInput>;
};

export type ProjectWhereInput = {
  AND?: Maybe<Array<ProjectWhereInput>>;
  NOT?: Maybe<Array<ProjectWhereInput>>;
  OR?: Maybe<Array<ProjectWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  feedbackTemplates?: Maybe<SubmissionTrackFeedbackTemplateListRelationFilter>;
  id?: Maybe<StringFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  name?: Maybe<StringFilter>;
  slug?: Maybe<StringFilter>;
  stacks?: Maybe<StackListRelationFilter>;
  stripeCurrentPeriodEnd?: Maybe<DateTimeNullableFilter>;
  stripeCustomerId?: Maybe<StringNullableFilter>;
  stripePriceId?: Maybe<StringNullableFilter>;
  stripeSubscriptionId?: Maybe<StringNullableFilter>;
  submissionTracks?: Maybe<SubmissionTrackListRelationFilter>;
  submissions?: Maybe<SubmissionListRelationFilter>;
  users?: Maybe<UserListRelationFilter>;
};

export type ProjectWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  project?: Maybe<Project>;
  stack?: Maybe<Stack>;
  submission?: Maybe<Submission>;
  submissionTrack?: Maybe<SubmissionTrack>;
  track?: Maybe<User>;
  userBySlug?: Maybe<User>;
};


export type QueryProjectArgs = {
  id?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryStackArgs = {
  id: Scalars['String'];
};


export type QuerySubmissionArgs = {
  id: Scalars['String'];
};


export type QuerySubmissionTrackArgs = {
  id: Scalars['String'];
};


export type QueryTrackArgs = {
  id: Scalars['String'];
};


export type QueryUserBySlugArgs = {
  slug?: Maybe<Scalars['String']>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type SendSubmissionInput = {
  optionalMessage?: Maybe<Scalars['String']>;
  projectId: Scalars['String'];
  title: Scalars['String'];
  trackIds: Array<Scalars['String']>;
  trackKeys: Array<Scalars['String']>;
  userId: Scalars['String'];
};

export type ShortlistSubmissionTrackInput = {
  stackId: Scalars['String'];
  submissionTrackId: Scalars['String'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Stack = {
  __typename?: 'Stack';
  commentBody: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  project: Project;
  submissionTracks: Array<SubmissionTrack>;
};


export type StackSubmissionTracksArgs = {
  after?: Maybe<SubmissionTrackWhereUniqueInput>;
  before?: Maybe<SubmissionTrackWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SubmissionTrackOrderByInput>>;
  where?: Maybe<SubmissionTrackWhereInput>;
};

export type StackListRelationFilter = {
  every?: Maybe<StackWhereInput>;
  none?: Maybe<StackWhereInput>;
  some?: Maybe<StackWhereInput>;
};

export type StackWhereInput = {
  AND?: Maybe<Array<StackWhereInput>>;
  NOT?: Maybe<Array<StackWhereInput>>;
  OR?: Maybe<Array<StackWhereInput>>;
  commentBody?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  description?: Maybe<StringNullableFilter>;
  id?: Maybe<StringFilter>;
  isPublic?: Maybe<BoolFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  name?: Maybe<StringFilter>;
  project?: Maybe<ProjectWhereInput>;
  projectId?: Maybe<StringFilter>;
  submissionTracks?: Maybe<SubmissionTrackListRelationFilter>;
};

export type StackWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type StartTrackUploadInput = {
  displayTitle: Scalars['String'];
  filename: Scalars['String'];
  format: Scalars['String'];
  size: Scalars['Int'];
  userId: Scalars['String'];
};

export type StartTrackUploadResponse = {
  __typename?: 'StartTrackUploadResponse';
  presignedPostData: Scalars['String'];
  trackId: Scalars['String'];
  trackKey: Scalars['String'];
};

export type StringFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  equals?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableFilter>;
  notIn?: Maybe<Array<Scalars['String']>>;
  startsWith?: Maybe<Scalars['String']>;
};

export type Submission = {
  __typename?: 'Submission';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  optionalMessage?: Maybe<Scalars['String']>;
  project: Project;
  reviewCompletedAt?: Maybe<Scalars['DateTime']>;
  reviewState: SubmissionReviewState;
  submissionTracks: Array<SubmissionTrack>;
  title: Scalars['String'];
  user: User;
};


export type SubmissionSubmissionTracksArgs = {
  after?: Maybe<SubmissionTrackWhereUniqueInput>;
  before?: Maybe<SubmissionTrackWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SubmissionTrackOrderByInput>>;
  where?: Maybe<SubmissionTrackWhereInput>;
};

export type SubmissionListRelationFilter = {
  every?: Maybe<SubmissionWhereInput>;
  none?: Maybe<SubmissionWhereInput>;
  some?: Maybe<SubmissionWhereInput>;
};

export type SubmissionOrderByInput = {
  createdAt?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  modifiedAt?: Maybe<SortOrder>;
  optionalMessage?: Maybe<SortOrder>;
  projectId?: Maybe<SortOrder>;
  reviewCompletedAt?: Maybe<SortOrder>;
  reviewState?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  userId?: Maybe<SortOrder>;
};

/** The current review state of a submission */
export enum SubmissionReviewState {
  Complete = 'COMPLETE',
  Pending = 'PENDING'
}

export type SubmissionTrack = {
  __typename?: 'SubmissionTrack';
  createdAt: Scalars['DateTime'];
  feedback?: Maybe<SubmissionTrackFeedback>;
  id: Scalars['String'];
  modifiedAt: Scalars['DateTime'];
  project: Project;
  reviewState: SubmissionTrackReviewState;
  stack?: Maybe<Stack>;
  submission: Submission;
  submissionId: Scalars['String'];
  submissionTrackInteractions: Array<SubmissionTrackInteraction>;
  track: Track;
};


export type SubmissionTrackSubmissionTrackInteractionsArgs = {
  after?: Maybe<SubmissionTrackInteractionWhereUniqueInput>;
  before?: Maybe<SubmissionTrackInteractionWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type SubmissionTrackFeedback = {
  __typename?: 'SubmissionTrackFeedback';
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  modifiedAt: Scalars['DateTime'];
  submissionTrack: Array<SubmissionTrack>;
};


export type SubmissionTrackFeedbackCommentsArgs = {
  after?: Maybe<CommentWhereUniqueInput>;
  before?: Maybe<CommentWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type SubmissionTrackFeedbackSubmissionTrackArgs = {
  after?: Maybe<SubmissionTrackWhereUniqueInput>;
  before?: Maybe<SubmissionTrackWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type SubmissionTrackFeedbackListRelationFilter = {
  every?: Maybe<SubmissionTrackFeedbackWhereInput>;
  none?: Maybe<SubmissionTrackFeedbackWhereInput>;
  some?: Maybe<SubmissionTrackFeedbackWhereInput>;
};

export type SubmissionTrackFeedbackTemplate = {
  __typename?: 'SubmissionTrackFeedbackTemplate';
  alignmentRating?: Maybe<Scalars['Int']>;
  color: Scalars['String'];
  commentBody: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['String'];
  isDefault: Scalars['Boolean'];
  label: Scalars['String'];
  modifiedAt: Scalars['DateTime'];
  project: Project;
};

export type SubmissionTrackFeedbackTemplateListRelationFilter = {
  every?: Maybe<SubmissionTrackFeedbackTemplateWhereInput>;
  none?: Maybe<SubmissionTrackFeedbackTemplateWhereInput>;
  some?: Maybe<SubmissionTrackFeedbackTemplateWhereInput>;
};

export type SubmissionTrackFeedbackTemplateWhereInput = {
  AND?: Maybe<Array<SubmissionTrackFeedbackTemplateWhereInput>>;
  NOT?: Maybe<Array<SubmissionTrackFeedbackTemplateWhereInput>>;
  OR?: Maybe<Array<SubmissionTrackFeedbackTemplateWhereInput>>;
  alignmentRating?: Maybe<IntNullableFilter>;
  color?: Maybe<StringFilter>;
  commentBody?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  description?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  isDefault?: Maybe<BoolFilter>;
  label?: Maybe<StringFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  project?: Maybe<ProjectWhereInput>;
  projectId?: Maybe<StringFilter>;
};

export type SubmissionTrackFeedbackTemplateWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type SubmissionTrackFeedbackWhereInput = {
  AND?: Maybe<Array<SubmissionTrackFeedbackWhereInput>>;
  NOT?: Maybe<Array<SubmissionTrackFeedbackWhereInput>>;
  OR?: Maybe<Array<SubmissionTrackFeedbackWhereInput>>;
  alignmentRating?: Maybe<IntNullableFilter>;
  comments?: Maybe<CommentListRelationFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  submissionTrack?: Maybe<SubmissionTrackListRelationFilter>;
};

export type SubmissionTrackInteraction = {
  __typename?: 'SubmissionTrackInteraction';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  locationIp?: Maybe<Scalars['String']>;
  playEnd?: Maybe<Scalars['Int']>;
  playStart?: Maybe<Scalars['Int']>;
  submissionTrack: SubmissionTrack;
  type: SubmissionTrackInteractionEvent;
};

export enum SubmissionTrackInteractionEvent {
  Download = 'DOWNLOAD',
  PlayEnd = 'PLAY_END',
  PlayStart = 'PLAY_START'
}

export type SubmissionTrackInteractionInput = {
  playEnd?: Maybe<Scalars['Int']>;
  playStart?: Maybe<Scalars['Int']>;
  submissionTrackId: Scalars['String'];
  type: Scalars['String'];
};

export type SubmissionTrackInteractionListRelationFilter = {
  every?: Maybe<SubmissionTrackInteractionWhereInput>;
  none?: Maybe<SubmissionTrackInteractionWhereInput>;
  some?: Maybe<SubmissionTrackInteractionWhereInput>;
};

export type SubmissionTrackInteractionWhereInput = {
  AND?: Maybe<Array<SubmissionTrackInteractionWhereInput>>;
  NOT?: Maybe<Array<SubmissionTrackInteractionWhereInput>>;
  OR?: Maybe<Array<SubmissionTrackInteractionWhereInput>>;
  city?: Maybe<StringNullableFilter>;
  country?: Maybe<StringNullableFilter>;
  countryCode?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  locationIp?: Maybe<StringNullableFilter>;
  playEnd?: Maybe<IntNullableFilter>;
  playStart?: Maybe<IntNullableFilter>;
  submissionTrack?: Maybe<SubmissionTrackWhereInput>;
  submissionTrackId?: Maybe<StringFilter>;
  type?: Maybe<EnumSubmissionTrackInteractionEventFilter>;
};

export type SubmissionTrackInteractionWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type SubmissionTrackListRelationFilter = {
  every?: Maybe<SubmissionTrackWhereInput>;
  none?: Maybe<SubmissionTrackWhereInput>;
  some?: Maybe<SubmissionTrackWhereInput>;
};

export type SubmissionTrackOrderByInput = {
  createdAt?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  modifiedAt?: Maybe<SortOrder>;
  projectId?: Maybe<SortOrder>;
  reviewState?: Maybe<SortOrder>;
  stackId?: Maybe<SortOrder>;
  submissionId?: Maybe<SortOrder>;
  submissionTrackFeedbackId?: Maybe<SortOrder>;
  trackId?: Maybe<SortOrder>;
};

/** The current review state of a submission track */
export enum SubmissionTrackReviewState {
  Declined = 'DECLINED',
  Pending = 'PENDING',
  Shortlisted = 'SHORTLISTED'
}

export type SubmissionTrackWhereInput = {
  AND?: Maybe<Array<SubmissionTrackWhereInput>>;
  NOT?: Maybe<Array<SubmissionTrackWhereInput>>;
  OR?: Maybe<Array<SubmissionTrackWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  feedback?: Maybe<SubmissionTrackFeedbackWhereInput>;
  id?: Maybe<StringFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  project?: Maybe<ProjectWhereInput>;
  projectId?: Maybe<StringFilter>;
  reviewState?: Maybe<EnumSubmissionTrackReviewStateFilter>;
  stack?: Maybe<StackWhereInput>;
  stackId?: Maybe<StringNullableFilter>;
  submission?: Maybe<SubmissionWhereInput>;
  submissionId?: Maybe<StringFilter>;
  submissionTrackFeedbackId?: Maybe<StringNullableFilter>;
  submissionTrackInteractions?: Maybe<SubmissionTrackInteractionListRelationFilter>;
  track?: Maybe<TrackWhereInput>;
  trackId?: Maybe<StringFilter>;
};

export type SubmissionTrackWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type SubmissionWhereInput = {
  AND?: Maybe<Array<SubmissionWhereInput>>;
  NOT?: Maybe<Array<SubmissionWhereInput>>;
  OR?: Maybe<Array<SubmissionWhereInput>>;
  createdAt?: Maybe<DateTimeFilter>;
  id?: Maybe<StringFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  optionalMessage?: Maybe<StringNullableFilter>;
  project?: Maybe<ProjectWhereInput>;
  projectId?: Maybe<StringFilter>;
  reviewCompletedAt?: Maybe<DateTimeNullableFilter>;
  reviewState?: Maybe<EnumSubmissionReviewStateFilter>;
  submissionTracks?: Maybe<SubmissionTrackListRelationFilter>;
  title?: Maybe<StringFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
};

export type SubmissionWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
};

export type Track = {
  __typename?: 'Track';
  displayTitle: Scalars['String'];
  downloadUrl?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  format: Scalars['String'];
  id: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  license?: Maybe<Scalars['String']>;
  size: Scalars['Int'];
  state: TrackProcessingState;
  streamUrl?: Maybe<Scalars['String']>;
  trackKey?: Maybe<Scalars['String']>;
  user: User;
  waveformData?: Maybe<Scalars['String']>;
  waveformId?: Maybe<Scalars['String']>;
  waveformKey?: Maybe<Scalars['String']>;
  waveformUrl?: Maybe<Scalars['String']>;
};

export type TrackListRelationFilter = {
  every?: Maybe<TrackWhereInput>;
  none?: Maybe<TrackWhereInput>;
  some?: Maybe<TrackWhereInput>;
};

/** The current processing state of a track */
export enum TrackProcessingState {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING'
}

export type TrackWhereInput = {
  AND?: Maybe<Array<TrackWhereInput>>;
  NOT?: Maybe<Array<TrackWhereInput>>;
  OR?: Maybe<Array<TrackWhereInput>>;
  SubmissionTrack?: Maybe<SubmissionTrackListRelationFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  displayTitle?: Maybe<StringFilter>;
  duration?: Maybe<IntNullableFilter>;
  filename?: Maybe<StringFilter>;
  format?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  isDeleted?: Maybe<BoolFilter>;
  license?: Maybe<StringNullableFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  size?: Maybe<IntFilter>;
  state?: Maybe<EnumTrackProcessingStateFilter>;
  trackKey?: Maybe<StringNullableFilter>;
  user?: Maybe<UserWhereInput>;
  userId?: Maybe<StringFilter>;
  waveformId?: Maybe<StringNullableFilter>;
  waveformKey?: Maybe<StringNullableFilter>;
};

export type UpdateStackInput = {
  commentBody?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
};

export type UpdateSubmissionTrackFeedbackTemplateInput = {
  alignmentRating?: Maybe<Scalars['Int']>;
  color?: Maybe<Scalars['String']>;
  commentBody?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
};

export type UpdateTrackInput = {
  displayTitle?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  state?: Maybe<Scalars['String']>;
  trackKey?: Maybe<Scalars['String']>;
  waveformId?: Maybe<Scalars['String']>;
  waveformKey?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type UpsertUserInput = {
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  isGuest: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  projects: Array<Project>;
  role: UserRole;
  type: UserType;
  username?: Maybe<Scalars['String']>;
};


export type UserProjectsArgs = {
  after?: Maybe<ProjectWhereUniqueInput>;
  before?: Maybe<ProjectWhereUniqueInput>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type UserListRelationFilter = {
  every?: Maybe<UserWhereInput>;
  none?: Maybe<UserWhereInput>;
  some?: Maybe<UserWhereInput>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export enum UserType {
  Artist = 'ARTIST',
  Business = 'BUSINESS'
}

export type UserWhereInput = {
  AND?: Maybe<Array<UserWhereInput>>;
  NOT?: Maybe<Array<UserWhereInput>>;
  OR?: Maybe<Array<UserWhereInput>>;
  comments?: Maybe<CommentListRelationFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  email?: Maybe<StringFilter>;
  id?: Maybe<StringFilter>;
  isGuest?: Maybe<BoolFilter>;
  modifiedAt?: Maybe<DateTimeFilter>;
  name?: Maybe<StringNullableFilter>;
  profile?: Maybe<ProfileWhereInput>;
  projects?: Maybe<ProjectListRelationFilter>;
  role?: Maybe<EnumUserRoleFilter>;
  stackAttributionId?: Maybe<IntNullableFilter>;
  submissions?: Maybe<SubmissionListRelationFilter>;
  tracks?: Maybe<TrackListRelationFilter>;
  type?: Maybe<EnumUserTypeFilter>;
  username?: Maybe<StringNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};
