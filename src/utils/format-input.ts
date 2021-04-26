import { snakeCase } from "lodash";

const formatInput = (entity: any) =>
  Object.keys(entity).map((key) => snakeCase(key));

export default formatInput;
