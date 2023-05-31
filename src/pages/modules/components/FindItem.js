import CTypeBool from './CTypeBool';
import CTypeInput from './CTypeInput';
import CTypeInputNumber from './CTypeInputNumber';

const itemMap = {
  string: CTypeInput,
  array: CTypeInput,
  object: CTypeInput,
  null: CTypeInput,
  number: CTypeInputNumber,
  integer: CTypeInputNumber,
  boolean: CTypeBool
};

export function findItem(type) {
  return itemMap[type || 'string'];
}