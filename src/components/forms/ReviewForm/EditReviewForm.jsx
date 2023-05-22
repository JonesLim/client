import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Form, Input, Button, FormGroup } from "reactstrap";
import Swal from "sweetalert2";
import { updateReview } from "../../../api/reviews";
import { ScaleLoader } from "react-spinners";

export function EditReviewForm({ review, token, setEditing }) {
  const { _id, content } = review;

  const [updatedReview, setUpdatedReview] = useState(content);
  const onChangeHandler = (e) => {
    setUpdatedReview(e.target.value);
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateReview, {
    onSuccess: (data) => {
      Swal.fire({
        title: "Successfully updated!",
        text: data.msg,
        icon: "success",
        timer: 1000, // Auto close duration in milliseconds
        showConfirmButton: false,
      });
      queryClient.invalidateQueries("reviews");
      setEditing(false);
    },
    onError: (err) => {
      Swal.fire({
        title: "Oops...",
        text: err?.response?.data?.msg || "Something went wrong !",
        icon: "error",
        showConfirmButton: true,
      });
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (updatedReview.trim().length === 0) {
      Swal.fire("Oops...", "This field must not be empty!", "error");
    } else {
      mutate({ id: _id, content: updatedReview, token });
    }
  };

  return (
    <>
      <Form onSubmit={onSubmitHandler}>
        <FormGroup className="d-flex">
          <Input
            type="textarea"
            name="content"
            placeholder="content"
            onChange={onChangeHandler}
            value={updatedReview}
          />
          <Button className="ms-2" disabled={isLoading}>
            {isLoading ? <ScaleLoader color="#36d7b7" /> : "Save"}
          </Button>
        </FormGroup>
      </Form>
    </>
  );
}
