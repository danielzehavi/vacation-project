import axios from "axios";
import VacationModel from "../Models/VacationModel";
import {
  addVacationAction,
  fetchVacationsAction,
  updateVacationAction,
  deleteVacationAction,
} from "../Redux/VacationsState";

import store from "../Redux/Store";
import config from "../Utils/Config";

class VacationsService {
  public async getAllVacations(): Promise<VacationModel[]> {
    // Take vacations from store:
    let vacations = store.getState().vacationsState.vacations;

    // If no vacations - get them from server:
    if (vacations.length === 0) {
      const response = await axios.get<VacationModel[]>(config.vacationsUrl);
      vacations = response.data;

      // Update store:
      store.dispatch(fetchVacationsAction(vacations));
    }

    return vacations;
  }

  // Get one vacation by id:
  public async getOneVacation(vacationId: number): Promise<VacationModel> {
    const vacations = await this.getAllVacations();
    const vacation = vacations.find((v) => v.vacationId === vacationId);
    return vacation;
  }

  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    // For sending data + files we need to send FormData object
    const formData = new FormData();
    formData.append("vacationInfo", vacation.vacationInfo);
    formData.append("destination", vacation.destination);
    formData.append("imageName", vacation.imageName);
    formData.append("image", vacation.image.item(0));
    formData.append("fromDate", vacation.fromDate);
    formData.append("untilDate", vacation.untilDate);
    formData.append("price", vacation.price.toString()); // Can send only strings (and files).

    // Add to backend:
    const response = await axios.post<VacationModel>(
      config.vacationsUrl,
      formData
    );
    const addedVacation = response.data;

    // Update store:
    store.dispatch(addVacationAction(addedVacation));

    return addedVacation;
  }
  // Update existing vacation:
  public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
    // For sending data + files we need to send FormData object
    const formData = new FormData();
    formData.append("vacationInfo", vacation.vacationInfo);
    formData.append("destination", vacation.destination);
    formData.append("imageName", vacation.imageName);
    formData.append("image", vacation.image.item(0));
    formData.append("fromDate", vacation.fromDate);
    formData.append("untilDate", vacation.untilDate);
    formData.append("price", vacation.price.toString()); // Can send only strings (and files).

    const response = await axios.put<VacationModel>(
      config.vacationsUrl + vacation.vacationId,
      formData
    );
    const updatedVacation = response.data;

    store.dispatch(updateVacationAction(updatedVacation));
    return updatedVacation;
  }

  // Delete existing vacation by id:
  public async deleteVacation(vacationId: number): Promise<void> {
    await axios.delete(config.vacationsUrl + vacationId);
    store.dispatch(deleteVacationAction(vacationId));
  }
}

const vacationsService = new VacationsService();

export default vacationsService;
