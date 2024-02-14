import { useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { createPost } from "../adapters/post-adapter";
import Dropdown from "../components/DropDown";


export default function CreatePostPage() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
//   const [uploadedImage, setUploadedImage] = useState(null);
  const [errorText, setErrorText] = useState('');
  const [formData, setFormData] = useState
  ({postPicture: '', projectDescription: '', userId: ''})

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText('')
    const {postPicture, projectDescription, userId} = formData
    if(!postPicture || !projectDescription){ 
        return setErrorText('Missing Picture or Description')
    }

      
    const [post, error] = await createPost(formData); 
    if(error){
        return setErrorText(error.message)
    } 
    setCurrentUser(user)
    setFormData(post)
    Navigate('/explore')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData, 
        [name]: value, 
    })) 
  };

  const handleImageChange = (e) => {

  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="create-heading">
      {/* <h1 id= "create-heading">Picture:</h1> */}
      <div id= "picture-section"> 
      <label htmlFor="image"> <h1>Picture:</h1> </label>
      <input type="" name="image" id="image" except="image/*" placeholder="Add An Image Of Your Finished Project Here" value={formData.postPicture} onChange={handleImageChange} required></input>
      </div>

      <div className="materials-section"> 
      <label htmlFor="materials"> <h1>Materials:</h1></label> 
      
      <Dropdown/>
      </div>

      <div className="description-section"> 
      <label htmlFor="description"> <h1> The Revamp:</h1></label> 
      <textarea type="text" id="description" name="description" placeholder="This Is Where You Help Others JAS UP The Materials They Have. Give Us A Step By Step Description Of Your Project." value={formData.projectDescription} onChange={handleChange} required></textarea>
      </div>

      <button type="submit">POST</button>
    </form>
  );
}

