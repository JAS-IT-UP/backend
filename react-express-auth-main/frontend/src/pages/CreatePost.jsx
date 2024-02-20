import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createPost } from "../adapters/post-adapter";
import { getMaterial } from "../adapters/materials-adapter";
import Dropdown from "../components/DropDown";
import PostCard from "../components/PostCard";


export default function CreatePostPage() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [error2, setErrorText2] = useState('');
  const [formData, setFormData] = useState({ postPicture: '', projectDescription: '', materialName: ''});
  // const [materials, setMaterials] = useState([]);
  const [posts, setPosts] = useState([]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText('')
    const { postPicture, projectDescription, materialName } = formData
    if(!postPicture || !projectDescription || !materialName){
      return setErrorText('Missing Picture or Description')
    }

    // const findMaterialId = (materialName) => {
    //   return materialName.id;
    // }
    // console.log(findMaterialId, "this is my material name")
    
    const materialByName = await getMaterial.findByMaterialName({materialName})

    if("Milk" === e.target.value){
      return 1;
    } else if("Jeans" === e.target.value){
      return 2;
    } else if("Mason Jars" === e.target.value){
      return 3;
    } else if("NewsPaper/Magazine" === e.target.value){
      return 4;
    } else if("Fabric Scraps" === e.target.value){
      return 5;
    } else if("Cans" === e.target.value){
      return 6;
    } else if("Other" === e.target.value){
      return 7;
    }

    const [post, error] = await createPost(formData); 
    if(error){
        return setErrorText(error.message)
    } 
    
    const [materials, error2] = await getMaterial(materialName);
    if(error2){
        return setErrorText2(error2.message)
    }

    console.log(post, 'this is the post i am getting back')
    setPosts([...posts, post]);


    setFormData(post)
    // navigate(`/users/${currentUser.id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData, 
        [name]: value, 
    })) 
  };

  return (
    <div>
    <form onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="create-heading">
      <div id= "picture-section"> 
      <label htmlFor="image"> <h1 id="create-heading">Picture:</h1> </label>
      <input type="" name="postPicture" id="image" except="image/*" placeholder="Add An Image Of Your Finished Project Here" 
      onChange={handleChange} 
      value={formData.postPicture} required></input>
      {/* <img src={formData.postPicture} alt="" /> */}
      </div>

      <div className="materials-section"> 
      <label htmlFor="materials"> <h1 id="materials">Materials:</h1></label> 
      
      <Dropdown updateState={setFormData} state={formData}/>
      </div>

      <div className="description-section"> 
      <label htmlFor="description"> <h1> The Revamp:</h1></label> 
      <textarea type="text" id="description" name="projectDescription" placeholder="This Is Where You Help Others JAS UP The Materials They Have. Give Us A Step By Step Description Of Your Project." onChange={handleChange} 
      value={formData.projectDescription}  required></textarea>
      </div>

      <button type="submit">POST</button>
    </form>
    <div>
    {posts.map((post, index) => (
      <PostCard key={index} postPicture={post.postPicture} projectDescription={post.projectDescription} materialName={post.materialName} />
    ))}
    </div>
    </div>
  );
}