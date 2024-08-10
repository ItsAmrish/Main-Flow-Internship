import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup, Alert } from "react-bootstrap";
import "./style.css";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(-1);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const apiUrl = "http://localhost:8000";

  const handleSubmit = () => {
    setError("")
    if(title.trim() !== '' && description.trim() !== ''){
        fetch(apiUrl+"/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title, description})
        }).then((res) => {
            if(res.ok){
                setTodos([...todos, {title, description}])
                setTitle("");
                setDescription("");
                setSuccess("Item added successfully")
                setTimeout(() => {
                    setSuccess("");
                },2000)
            } else {
                setError("Unable to create Todo item")
            }
        }).catch(() => {
            setError("Unable to create Todo item")
        })
    }
}

useEffect(() => {
    getItems()
},[])

const getItems = () => {
    fetch(apiUrl+"/todos")
    .then((res) => res.json())
    .then((res) => {
        setTodos(res)
    })
}

const handleUpdate = () => {
    setError("")
    if(editTitle.trim() !== '' && editDescription.trim() !== ''){
        fetch(apiUrl+"/todos/"+editId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title : editTitle, description : editDescription})
        }).then((res) => {
            if(res.ok){
                const updatedTodo = todos.map((item) => {
                    if(item._id === editId){
                        item.title = editTitle;
                        item.description = editDescription;
                    }
                    return item;
                })
                setTodos(updatedTodo)
                setEditTitle("")
                setEditDescription("")
                setSuccess("Item updated successfully")
                setTimeout(() => {
                    setSuccess("");
                },2000)
                setEditId(-1)
            } else {
                setError("Unable to update Todo item")
            }
        }).catch(() => {
            setError("Unable to create Todo item")
        })
    }

}

const handleEdit = (item) => {
    setEditId(item._id); 
    setEditTitle(item.title); 
    setEditDescription(item.description);
}

const handleEditCancel = () => {
    setEditId(-1);
}

const handleDelete = (id) => {
    if(window.confirm('Are you sure want to delete?')){
        fetch(apiUrl+'/todos/'+id, {
            method: "DELETE"
        })
        .then(() => {
            const updatedTodo =todos.filter((item) => item._id !== id)
            setTodos(updatedTodo)
        })
    }
}

  return (
    <Container fluid className="p-5" style={{ backgroundColor: '#222831', color: '#EEEEEE', minHeight: '100vh'}}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm" style={{ backgroundColor: '#31363F', color: '#EEEEEE' }}>
            <Card.Body>
              <h1 className="text-center">Todo Application</h1>
              <hr style={{ backgroundColor: '#EEEEEE' }} />
              <Form>
                <Form.Group controlId="title">
                  <Form.Label>Enter Item</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter item"
                    style={{ backgroundColor: '#222831', color: '#EEEEEE' }}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label style={{ marginTop: "10px"}}>Enter Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    style={{ backgroundColor: '#222831', color: '#EEEEEE' }}
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit} style={{ 
                    backgroundColor: '#76ABAE', 
                    borderColor: '#76ABAE', 
                    marginTop: "20px", 
                    justifyContent: "center", 
                    alignItems: "center",
                    width: "30%", 
                    display: "block", 
                    marginLeft: "auto", 
                    marginRight: "auto"}}>
                            Add
                </Button>
              </Form>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" className="mt-3">
                  {success}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card className="shadow-sm" style={{ backgroundColor: '#31363F', color: '#EEEEEE' }}>
            <Card.Body>
              <h3>Todo List</h3>
              <ListGroup>
                {todos.map((item) => (
                  <ListGroup.Item key={item._id} className="d-flex justify-content-between align-items-center" style={{ backgroundColor: '#222831', color: '#EEEEEE' }}>
                    <div className="d-flex flex-column me-2">
                      {editId === -1 || editId !== item._id ? (
                        <>
                          <span className="fw-bold">{item.title}</span>
                          <span>{item.description}</span>
                        </>
                      ) : (
                        <Form>
                          <Form.Group controlId="editTitle">
                            <Form.Label>Enter Item</Form.Label>
                            <Form.Control
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Enter item"
                              style={{ backgroundColor: '#31363F', color: '#EEEEEE' }}
                            />
                          </Form.Group>
                          <Form.Group controlId="editDescription">
                            <Form.Label>Enter Description</Form.Label>
                            <Form.Control
                              type="text"
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              placeholder="Enter description"
                              style={{ backgroundColor: '#31363F', color: '#EEEEEE' }}
                            />
                          </Form.Group>
                        </Form>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      {editId === -1 || editId !== item._id ? (
                        <Button variant="success" onClick={() => handleEdit(item)} style={{ backgroundColor: '#76ABAE', borderColor: '#76ABAE' }}>
                          Edit
                        </Button>
                      ) : (
                        <Button variant="success" onClick={handleUpdate} style={{ backgroundColor: '#76ABAE', borderColor: '#76ABAE' }}>
                          Update
                        </Button>
                      )}
                      {editId === -1 || editId !== item._id ? (
                        <Button variant="danger" onClick={() => handleDelete(item._id)} style={{ backgroundColor: '#E63946', borderColor: '#E63946' }}>
                          Delete
                        </Button>
                      ) : (
                        <Button variant="danger" onClick={handleEditCancel} style={{ backgroundColor: '#E63946', borderColor: '#E63946' }}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
