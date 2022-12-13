class VacationModel {
  public vacationId: number;
  public vacationInfo: string;
  public destination: string;
  public imageName: string;
  public image: FileList;
  public fromDate: string;
  public untilDate: string;
  public price: number;
  public followersCount?: number;
  public isFollowing?: number;

  public constructor(vacation: VacationModel) {
    this.vacationId = vacation.vacationId;
    this.vacationInfo = vacation.vacationInfo;
    this.destination = vacation.destination;
    this.imageName = vacation.imageName;
    this.image = vacation.image;
    this.fromDate = vacation.fromDate;
    this.untilDate = vacation.untilDate;
    this.price = vacation.price;
  }
}

export default VacationModel;
