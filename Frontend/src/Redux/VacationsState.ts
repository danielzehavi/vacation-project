import VacationModel from "../Models/VacationModel";

// 1. Vacations State - The global state relate to Vacations:
export class VacationsState {
  public vacations: VacationModel[] = [];
}

// 2. Vacations Action Type - list of actions we can do on the above VacationsState:
export enum VacationsActionType {
  FetchVacations = "FetchVacations",
  AddVacation = "AddVacation",
  UpdateVacation = "UpdateVacation",
  DeleteVacation = "DeleteVacation",
}

// 3. Vacation Action - interface for building a single action from the above VacationsActionType
export interface VacationsAction {
  type: VacationsActionType; // The type of the acton to perform.
  payload: any; // The data we need to do that action
}

// 4. Action Creators - Functions for creating suitable Action objects:
export function fetchVacationsAction(
  vacations: VacationModel[]
): VacationsAction {
  const action: VacationsAction = {
    type: VacationsActionType.FetchVacations,
    payload: vacations,
  };
  return action;
}
export function addVacationAction(vacation: VacationModel): VacationsAction {
  const action: VacationsAction = {
    type: VacationsActionType.AddVacation,
    payload: vacation,
  };
  return action;
}
export function updateVacationAction(vacation: VacationModel): VacationsAction {
  const action: VacationsAction = {
    type: VacationsActionType.UpdateVacation,
    payload: vacation,
  };
  return action;
}
export function deleteVacationAction(vacationId: number): VacationsAction {
  const action: VacationsAction = {
    type: VacationsActionType.DeleteVacation,
    payload: vacationId,
  };
  return action;
}

// 5. Vacations Reducer - Do any of the above actions:
export function vacationsReducer(
  currentState: VacationsState = new VacationsState(),
  action: VacationsAction
): VacationsState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationsActionType.FetchVacations:
      newState.vacations = action.payload; // <-- here payload is all vacations
      break;

    case VacationsActionType.AddVacation:
      newState.vacations.push(action.payload); // <-- here payload is the Vacation to add.
      break;

    case VacationsActionType.UpdateVacation:
      const indexToUpdate = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      ); // <-- here payload is the Vacation to update.
      if (indexToUpdate >= 0) {
        newState.vacations[indexToUpdate] = action.payload;
      }
      break;

    case VacationsActionType.DeleteVacation:
      const indexToDelete = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload
      ); // <-- here payload is the id to delete.
      if (indexToDelete >= 0) {
        newState.vacations.splice(indexToDelete, 1);
      }
      break;
  }

  return newState;
}
