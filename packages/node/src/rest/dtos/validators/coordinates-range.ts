import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

/**
 * Validates that a `[longitude, latitude]` tuple falls within Earth's valid
 * geographic ranges (lon ∈ [-180, 180], lat ∈ [-90, 90]).
 */
@ValidatorConstraint({ name: "coordinatesRange", async: false })
export class CoordinatesRangeConstraint
  implements ValidatorConstraintInterface
{
  validate(coordinates: [number, number]) {
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      return false;
    }
    const [longitude, latitude] = coordinates;
    return (
      latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
    );
  }

  defaultMessage() {
    return "Coordinates must be within valid geographic ranges";
  }
}
