import { formatError as formatApolloError } from "apollo-errors";

const formatError = (error) => formatApolloError(error);

export default formatError;
