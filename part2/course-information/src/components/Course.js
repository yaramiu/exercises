import Header from "./Header";
import Subheader from "./Subheader";
import Content from "./Content";
import Total from "./Total";
import { Fragment } from "react";

const Course = ({ courses }) => {
  return (
    <>
      <Header title={"Web development curriculum"} />
      {courses.map((course) => {
        return (
          <Fragment key={course.id}>
            <Subheader title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </Fragment>
        );
      })}
    </>
  );
};

export default Course;
