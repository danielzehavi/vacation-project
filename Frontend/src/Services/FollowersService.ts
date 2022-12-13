import axios from "axios";
import VacationModel from "../Models/VacationModel";
import FollowersModel from "../Models/FollowersModel";
import store from "../Redux/Store";
import config from "../Utils/Config";
import { fetchVacationsAction } from "../Redux/VacationsState";

class FollowersVacationsService {
  public async getAllVacationsByFollowers(
    userId: number
  ): Promise<VacationModel[]> {
    const response = await axios.get<VacationModel[]>(
      config.vacationsByFollowersUrl + userId
    );
    const vacationFollowers = response.data;
    // Update store:
    store.dispatch(fetchVacationsAction(vacationFollowers));
    return vacationFollowers;
  }

  public async addFollower(follower: FollowersModel): Promise<FollowersModel> {
    // Add to backend:
    const response = await axios.post<FollowersModel>(
      config.vacationsByFollowersUrl,
      follower
    );
    const addedVacation = response.data;

    // call store:
    this.getAllVacationsByFollowers(addedVacation.userId);

    return addedVacation;
  }

  // Delete existing follower:
  public async deleteFollower(follower: FollowersModel): Promise<void> {
    await axios.delete(config.vacationsByFollowersUrl + follower.vacationId, {
      headers: {
        vacationId: follower.vacationId,
      },
      data: {
        follower: follower,
      },
    });
    // call store:
    this.getAllVacationsByFollowers(follower.userId);
  }
}

const followersVacationsService = new FollowersVacationsService();

export default followersVacationsService;
