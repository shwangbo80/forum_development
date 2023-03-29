import React, { useState, useEffect } from "react";
import { Table, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./games.css";
import { useAuth0 } from "@auth0/auth0-react";
import EditButton from "../../components/EditButton";

const GamesComponent = () => {
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
            <th className="numHead">No</th>
            <th className="topicHead">Topic</th>
            <th className="authorHead">Created By</th>
            <th className="commentsHead text-center">Comments</th>
            <th className="lastPostHead">Last Post</th>
          </tr>
        </thead>
      </Table>
      <Table>
        <tbody className="tbodyContainer">
          <tr>
            <td className="numHead">3</td>
            <td className="topicHead">
              <Link to="../forums/post">The Elder Scrolls V: Skyrim</Link>
            </td>
            <td className="authorHead">Otto</td>
            <td className="commentsHead text-center">11</td>
            <td className="lastPostHead">1/1/2023</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default GamesComponent;
