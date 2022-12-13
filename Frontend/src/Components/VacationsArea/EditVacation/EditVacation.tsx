import "./EditVacation.css";
import { useEffect, useState, SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function EditVacation(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setValue } =
    useForm<VacationModel>();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [stateVacation, setVacation] = useState<VacationModel>();

  // When start date is picked, it becomes the min for end date:
  const handleDateChange = (e: SyntheticEvent) => {
    const select = e.target as HTMLSelectElement;
    let newStartDate = new Date(select.value);
    // add a day
    newStartDate.setDate(newStartDate.getDate() + 1);
    setStartDate(newStartDate);
  };

  useEffect(() => {
    const vacationId: number = +params.vacationId;
    vacationsService
      .getOneVacation(vacationId)
      .then((vacationToEdit) => {
        setVacation(vacationToEdit);
        setStartDate(new Date(vacationToEdit.fromDate.split("T")[0]));
        setValue("destination", vacationToEdit.destination);
        setValue("vacationInfo", vacationToEdit.vacationInfo);
        setValue("fromDate", vacationToEdit.fromDate.split("T")[0]);
        setValue("untilDate", vacationToEdit.untilDate.split("T")[0]);
        setValue("price", vacationToEdit.price);
      })
      .catch((err) => console.log(err.message));
  }, []);

  async function send(formVacation: VacationModel) {
    try {
      formVacation.vacationId = stateVacation.vacationId;
      const updatedVacation = await vacationsService.updateVacation(
        formVacation
      );
      notifyService.success("Vacation added!");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }
  return (
    <div className="EditVacation Box">
      <Container>
        <Row className="g-8 justify-content-center">
          <h5>Update Vacation</h5>

          <Form onSubmit={handleSubmit(send)}>
            <Form.Group className="mb-3" controlId="formGroupDestination">
              <Form.Label>Destination:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Destination"
                {...register("destination")}
                required
                minLength={3}
                maxLength={100}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                {...register("vacationInfo")}
                required
                minLength={5}
                maxLength={150}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupFromDate">
              <Form.Label>From:</Form.Label>
              <Form.Control
                type="date"
                {...register("fromDate")}
                min={new Date().toISOString().split("T")[0]}
                onChange={handleDateChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupUntilDate">
              <Form.Label>To:</Form.Label>
              <Form.Control
                type="date"
                {...register("untilDate")}
                required
                min={new Date(startDate).toISOString().split("T")[0]}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPrice">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                {...register("price")}
                required
                min="1"
                max="5000"
                step="0.01"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupImage">
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="file"
                {...register("image")}
                required
                accept="image/*"
              />
            </Form.Group>

            <Button variant="light" type="submit">
              Update
            </Button>
            <Button variant="light" onClick={() => navigate("/vacations")}>
              Back
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default EditVacation;
