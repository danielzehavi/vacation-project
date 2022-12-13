import "./AddVacation.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import { useState, SyntheticEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function AddVacation(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<VacationModel>();
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  // When start date is picked, it becomes the min for end date:
  const handleDateChange = (e: SyntheticEvent) => {
    const select = e.target as HTMLSelectElement;
    let newStartDate = new Date(select.value);
    // add a day
    newStartDate.setDate(newStartDate.getDate() + 1);
    setStartDate(newStartDate);
  };

  async function send(vacation: VacationModel) {
    try {
      const addedVacation = await vacationsService.addVacation(vacation);
      notifyService.success("Vacation added!");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error(err);
    }
  }
  return (
    <div className="AddVacation Box">
      <Container>
        <Row className="g-8 justify-content-center">
          <h5>Add New Vacation</h5>

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
              Add
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

export default AddVacation;
