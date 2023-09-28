import React,{useRef, useState,useContext} from "react";
import { Box, TextField, ClickAwayListener, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";
import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 600px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67/ 30%), 0 2px 6px 2px rgb(60 64 67/ 15%);
  padding: 10px 15px;
  border-radius: 8px;
  border-color: #e0e0e0;
  @media (min-width: 1240px) {
    margin: 0 420px;
  }
  min-height:30px
`; //agr hm``litterals na lgein iska mtlb ye plain js hai jbk hme styled se return jsx chahye react component
// you are providing the styled utility with the CSS styles for your component, and it returns a valid React component that can be rendered as a child within your JSX code.

const Note = {
id:'',
heading:'',
text:'',
noteColor: '',
reminderDate:''
};

const Form = () => {
  const[showTextField,setShowTextField]=useState(false);
  const[addNote,setAddNote]=useState({...Note,id:uuid()});//{unique id generate kr rha object ye }particular note hai jb ye sb notes bn jae gae tou tou isko datacontext k note k array mae dal dein gae
  const [showCloseButton, setShowCloseButton] = useState(false);

  const{notes,setNotes}= useContext(DataContext);

  const containerRef = useRef();

  const onTextAreaClick = () =>{
    setShowTextField(true);
    setShowCloseButton(true);
    containerRef.current.style.minHeight=' 100px';//jb textfield pr click krty tou itni height chahiye jb no click tou height chnge dynamic css change k liye ref
  };

  const handleClickAway = () =>{
    setShowTextField(false);
    setShowCloseButton(false); 
    containerRef.current.style.minHeight=' 30px';
    setAddNote({...Note,id:uuid()});// jb note likh liya textinput ko khali b tou krna usk liye or sth uuid taak next note k lye new id bne
    if(addNote.heading || addNote.text){// jb if nhi lgaya tha tou bahir click kr dety thy tou array generte with text heading emty hmne condition lgai text ya heading mae kuch ho ga tou set krein
      //setNotes(addnotes) ye direct wala kam nhi krna kion k array mae direct obj no store diectly array ko obj se replce nhi krna
      setNotes(prevArr =>[addNote,...prevArr]);//usestate array return us mae direact obj nhi askta usko array mae kiya 
    }
  };

  const handleCloseButtonClick = () => {
    setShowCloseButton(false);
    setShowTextField(false);
    containerRef.current.style.minHeight=' 30px';
    setAddNote({...Note,id:uuid()});
    if(addNote.heading || addNote.text){
      setNotes(prevArr =>[addNote,...prevArr]);//usestate array return us mae direact obj nhi askta usko array mae kiya 
    }
  };
  

  const onTextChange = (e) =>{
    let ChangedNote = {...addNote,[e.target.name]:e.target.value};//[]key :value... Note k heading ya text mae value store honi  ye pta  target nme se ho ga  or usk sth jo '' us mae value store 
    setAddNote(ChangedNote);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
    <Container ref={containerRef}>
      {showTextField && 
      <TextField 
      placeholder="Title"
      variant="standard"
      InputProps={{disableUnderline: true}}
      style={{marginBottom:10}}
      onChange={(e) => onTextChange(e)}//textfield pr jo likh rhy get kr rhy 
      name="heading"//do text field hein kaise pta chle ga konse textfld ki value so give name 
      value={addNote.heading}/>//  jb b value prop use kro isko controlled component kehty is se textinput khali ho jata helo hmne type kiya textfield mae helo show ho rhs hota empty k liye kiya This prop is responsible for controlling the current value displayed in the text field.addnote heading mae jo b value ho gae hme show sirf wohi krwae ga yaha so jb addnote mae heading add ho jae gae state khali ho gae automatically yaha se b textfield pr input likha huva show nhi ho ga 
} 
      <TextField 
      placeholder="Take a note..."
      multiline
      maxRows={Infinity}
      variant="standard"
      InputProps={{disableUnderline: true}}
      onClick={onTextAreaClick}
      onChange={(e) => onTextChange(e)}
      name="text"
      value={addNote.text}/>
      {showCloseButton && (
          <Button
            variant="text"
            size="small"
            style={{ color: 'grey',marginLeft:"505px", textTransform: "none" }} 
            onClick={handleCloseButtonClick}
          >
            Close
          </Button>
        )}
      
    </Container>
    </ClickAwayListener>
  );
};

export default Form;
