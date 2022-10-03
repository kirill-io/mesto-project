import {hasInvalidInput} from '../components/validate.js'

export const checkPlaceName = (namePlace) => {
  return namePlace[0].toUpperCase() + namePlace.slice(1).toLowerCase();
};
