import React from "react";
import {Table, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./games.css";

function GamesComponent() {
  return (
    <>
      <div>
        <h2 className="mb-4">Games Forum</h2>
        <div className="mb-4">
          <Link to="../forums/createpost">
            <Button>Make a post</Button>
          </Link>
        </div>
      </div>
      <Table hover responsive>
        <thead className="bg-secondary text-light">
          <tr>
            <th>No</th>
            <th className="topicHead">Topic</th>
            <th className="authorHead">Created By</th>
            <th className="commentsHead">Comments</th>
            <th className="lastPostHead">Last Post</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3</td>
            <td>
              <Link to="../forums/post">The Elder Scrolls V: Skyrim</Link>
            </td>
            <td>Otto</td>
            <td>11</td>
            <td>1/1/2023</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>23</td>
            <td>1/1/2023</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Larry the Bird</td>
            <td>Mark</td>
            <td>8</td>
            <td>1/1/2023</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default GamesComponent;
