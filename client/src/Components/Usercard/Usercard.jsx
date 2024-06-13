import React from 'react';
import { Card, Button } from 'react-bootstrap';
import alen from '../../assets/member/alen.png';
import dastin from '../../assets/member/dastin.jpg';
import sanje from '../../assets/member/sanje.jpg';
import gurs from '../../assets/member/gurs.jpg';

const UserCard = () => {
  const imageStyle = {
    width: '100%',
    height: '400px',
    objectFit: 'cover'
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 card-container">
          <Card style={{ width: '20rem', margin: '100px 0 20px 0' }}>
            <Card.Img variant="top" src={alen} style={imageStyle} />
            <Card.Body>
              <Card.Title>Alen Banez</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">alenzmmb@gmail.com</Card.Subtitle>
              <Card.Text>
                <div>Interest:</div>
                <div>Followers:</div>
                <div>Followings:</div>
              </Card.Text>
              <Button variant="primary" className="mt-2">Follow</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 card-container">
          <Card style={{ width: '20rem', margin: '100px 0 20px 0' }}>
            <Card.Img variant="top" src={dastin} style={imageStyle} />
            <Card.Body>
              <Card.Title>Dastin Contento</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">alenzmmb@gmail.com</Card.Subtitle>
              <Card.Text>
                <div>Interest:</div>
                <div>Followers:</div>
                <div>Followings:</div>
              </Card.Text>
              <Button variant="primary" className="mt-2">Follow</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 card-container">
          <Card style={{ width: '20rem', margin: '100px 0 20px 0' }}>
            <Card.Img variant="top" src={sanje} style={imageStyle} />
            <Card.Body>
              <Card.Title>Joseph Sanje</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">alenzmmb@gmail.com</Card.Subtitle>
              <Card.Text>
                <div>Interest:</div>
                <div>Followers:</div>
                <div>Followings:</div>
              </Card.Text>
              <Button variant="primary" className="mt-2">Follow</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 card-container">
          <Card style={{ width: '20rem', margin: '100px 0 20px 0' }}>
            <Card.Img variant="top" src={gurs} style={imageStyle} />
            <Card.Body>
              <Card.Title>Gurs Singh</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">gursshing@gmail.com</Card.Subtitle>
              <Card.Text>
                <div>Interest: Basketball</div>
                <div>Followers: 0</div>
                <div>Followings: 0</div>
              </Card.Text>
              <Button variant="primary" className="mt-2">Follow</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
