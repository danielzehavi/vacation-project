import { io, Socket } from "socket.io-client";
import VacationModel from "../Models/VacationModel";
import { deleteVacationAction } from "../Redux/VacationsState";
import store from "../Redux/Store";
import followersVacationsService from "./FollowersService";
import FollowersModel from "../Models/FollowersModel";

class SocketService {
  private socket: Socket;
  private user = store.getState().authState.user;

  public connect(): void {
    this.socket = io("http://localhost:3001");
    this.listen();
  }

  private listen(): void {
    // Listen to adding by admin:
    this.socket.on("admin-added-vacation", (vacation: VacationModel) => {
      // call store:
      followersVacationsService.getAllVacationsByFollowers(this.user.userId);
    });

    // Listen to updating by admin:
    this.socket.on("admin-updated-vacation", (vacation: VacationModel) => {
      // call store:
      followersVacationsService.getAllVacationsByFollowers(this.user.userId);
    });

    // Listen to deleting by admin:
    this.socket.on("admin-deleted-vacation", (vacationId: number) => {
      store.dispatch(deleteVacationAction(vacationId));
    });

    // Listen to new follower added:
    this.socket.on("follower-added", (follower: FollowersModel) => {
      // call store:
      followersVacationsService.getAllVacationsByFollowers(follower.userId);
    });

    // Listen to deleting follower:
    this.socket.on("follower-deleted", (follower: FollowersModel) => {
      followersVacationsService.getAllVacationsByFollowers(follower.userId);
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}

const socketService = new SocketService();

export default socketService;
