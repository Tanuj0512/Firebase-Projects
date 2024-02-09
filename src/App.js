import { Auth } from "./Components/auth";
import "./App.css";
import { db, auth,storage } from "./Config/firebase";
import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {ref, uploadBytes} from "firebase/storage";


function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setnewReleaseDate] = useState(0);
  const [isReceivedOscar, setIsReceivedOsar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  // const [fileUploadState, setFileUploadState ] = useEffect("");
  const [fileUpload, setFileUpload] = useState(null);
  const moviesColection = collection(db, "movies");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesColection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovietitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };
 const uploadFile = async() => {
  if (!fileUpload) return ;
  const filesFolderRef = ref(storage, `projectFiles/ $(fileUpload.name}`);
  try{
    await uploadBytes (filesFolderRef, fileUpload);
  }catch(err){
    console.log(err);
  }
 };
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesColection, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isReceivedOscar,
        userId : auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="movie title.."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Data.."
          type="number"
          onChange={(e) => setnewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isReceivedOscar}
          onChange={(e) => setIsReceivedOsar(e.target.checked)}
        />
        <label>Received Oscar ?</label>
        <button onClick={onSubmitMovie}>Submit</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "yellow" }}>
              {movie.title}
            </h1>
            Date : {movie.releaseDate}
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie </button>
            <input
              placeholder="new title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovietitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>

<input type = "file"
onChange={(e)=> setFileUpload (e.target.files[0])}/>
<button onClick={uploadFile}>Upload</button>

    </div>
  );
}

export default App;
