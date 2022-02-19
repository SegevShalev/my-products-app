import React, { useState } from "react";
import "../App.css";
import Modal from "react-modal";


export default function Admin(props) {
  const [data, setData] = useState(props.init_data);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [currentId, setCurrentId] = useState();
  const [currentTitle,setCurrentTitle] = useState();
  const [currentDesc,setCurrentDesc] = useState();
  const [currentPrice,setCurrentPrice] = useState();
  const [currentImage,setCurrentImage] = useState();
  


  const deleteHandler = (deletedItem) => {
    let newData = [...data]
    newData=newData.filter((item) => {
      if(item.id !== deletedItem.id) {
        return(item)
      }
    })
    setData(newData);
    props.dataCallback(newData) 
    return;
  };

  const editHandler = (newTitle, newDesc, newPrice,newImg) => {
    newDesc=newDesc.substring(0,20)
    let newData = [...data];
    newData.forEach((item) => {
      if(item.id===currentId){
        item.title = newTitle;
        item.description=newDesc;
        item.price = newPrice;
        item.image = newImg;
      }
    })
    setData(newData);
    setEditModalOpen(false)
    props.dataCallback(newData) 
    return;
  };

  const addHandler = async(newTitle, newDesc, newPrice, newImg) => {
    let newData = [...data];
    newDesc=newDesc.substring(0,20)
    newData.push({id:`${newTitle}${newDesc}`, title:newTitle, description:newDesc, price:newPrice,image:newImg})
    setData(newData);
    setCurrentTitle(null)
    setCurrentDesc(null)
    setCurrentPrice(null)
    setCurrentImage(null)
    setAddModalOpen(false)
    props.dataCallback(newData) 
    return;
  }

  const openAddModal = () => {
    setAddModalOpen(true)
  };

  const openEditModal = (item) => {
    setEditModalOpen(true)
    setCurrentId(item.id)
    setCurrentTitle(item.title)
    setCurrentDesc(item.description)
    setCurrentPrice(item.price)
    setCurrentImage(item.image)
  };

  Modal.setAppElement('#root')


  let displayProduct = data.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.price}$</td>
        <td>
          <img src={item.image} alt="err" width="100" height="100"></img>
        </td>
        <td>
          <div>
            <button onClick={() => openEditModal(item)}>edit</button>
            <button onClick={() => deleteHandler(item)}>delete</button>
          </div>
        </td>
      </tr>
    );
  });

 

  return (
    <div>
      <button onClick={() =>{openAddModal()}}>Add new product</button>
      <div className="App">
        <table id={"table"} border="1" cellSpacing="0">
          <thead>
            <tr key ={1}>
              <th>title</th>
              <th>description</th>
              <th>price</th>
              <th>image</th>
              <th>option</th>
            </tr>
          </thead>
          <tbody>{displayProduct}</tbody>
        </table>
    </div>

      <Modal
        style={{
          overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          content: {
            position: "absolute",
            top: "100px",
            left: "220px",
            right: "220px",
            bottom: "550px",
            padding: "10px",
            textAlign: "center"
          },
        }}
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}>
          <div>
            <input type="text"  value={currentTitle} onChange={(e) =>setCurrentTitle(e.target.value)}/> {`     `}
            <input type="text"  value={currentDesc} onChange={(e) =>setCurrentDesc(e.target.value)}/> {`      `}
            <input type="text"  value={currentPrice} onChange={(e) =>setCurrentPrice(e.target.value)}/> <br/><br/>
            <input type="text"  value={currentImage} onChange={(e) =>setCurrentImage(e.target.value)} /> <br/><br/>
            <button onClick={() => editHandler(currentTitle,currentDesc,currentPrice,currentImage)} >Edit Product</button>
          </div>

        </Modal>

        <Modal
        style={{
          overlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          content: {
            position: "absolute",
            top: "100px",
            left: "220px",
            right: "220px",
            bottom: "550px",
            padding: "10px",
            textAlign: "center"
          },
        }}
        isOpen={addModalOpen}
        onRequestClose={() => setAddModalOpen(false)}>
           <div>
            Title: <input type="text"  onChange={(e) =>setCurrentTitle(e.target.value)}/> {`     `}
            Description: <input  placeholder="up to 20 characters" type="text"  onChange={(e) =>setCurrentDesc(e.target.value)}/> {`      `}
            Price: <input type="text"  onChange={(e) =>setCurrentPrice(e.target.value)}/> <br/><br/>
            Img Url: <input type="text"  onChange={(e) =>setCurrentImage(e.target.value)} /> <br/><br/>
            <button onClick={() => addHandler(currentTitle,currentDesc,currentPrice,currentImage)} >Add Product</button>
          </div>
        </Modal>
    </div>
  );
}
