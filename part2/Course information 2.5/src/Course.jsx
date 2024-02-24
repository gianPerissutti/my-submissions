import React from 'react';

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <h3>{course.name}</h3>
          {course.parts.map(item => (
            <p key={item.id}>{item.name} {item.exercises}</p>
          ))}
          <b>total exercises: {course.parts.reduce((result, item) => result + item.exercises, 0)}</b>
        </div>
      ))}
    </div>
  );
};

export default Course;