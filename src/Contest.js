import React, { useState, useEffect ,useRef} from 'react';
import './Contest.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AceEditor from 'react-ace';
import emailjs from 'emailjs-com';

// Import Ace editor and its required modules
import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-c_cpp'; // Import C++ mode
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/webpack-resolver';

import logo from './images/Adicshan_Logo.png';
import list from './images/list.png';
import close from './images/close.png';
import tick from './images/tick.gif';

import timer from './images/timer.png';

import questionsData from './ques.json';
import { useNavigate } from 'react-router-dom';

const Contest = () => {

 
  const [msg2,setMsg2]  = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState(questionsData);
  const [currentTopic, setCurrentTopic] = useState(questionsData.Contest);
  const [id, setId] = useState(0);
  const [count ,setCount] = useState(0);
  const [code, setCode] = useState(currentTopic[id].code);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    upiID: ''
  });






  const [errors, setErrors] = useState({ name: '', email: '', upiID: '' });


  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);


const navigate = useNavigate();






  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
  };





  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, upiID } = formData;
   

    let validationErrors = {};

    if (!name) {
      validationErrors.name = 'Name is required';
    }
    if (!email) {
      validationErrors.email = 'Email is required';
    }
    if (!upiID) {
      validationErrors.upiID = 'UPI ID is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
        const form = document.querySelector('.form-card'); // Use querySelector to get a single element
        if (form) {
          form.style.display = "none";
        }
      
      if(!isActive){
        setIsActive(true);
        intervalRef.current = setInterval(() =>{
          setTime(prevTime => prevTime + 1);
        },1000);
      }

  const end = document.getElementById('end');
  end.style.display = "block";

    }
  };


  const stopTimer = () =>{
    if(isActive){
      clearInterval(intervalRef.current);
      setIsActive(false);
    }

    alert('Thanks for participating, result will be declared soon');
 navigate('/');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      upiID: formData.upiID,
      time:  time,
      count: count
    }

    emailjs.send(
      'service_k4g47gk',  // Replace with your EmailJS service ID
      'template_rbda9qq', // Replace with your EmailJS template ID
      templateParams,
      '-5I80jblkTg-a6EIi'   // Replace with your EmailJS public key (user ID)
    )
    .then((response) => {
      
setMsg2("send ho gya")
    })
    .catch((error) => {
setMsg2("send nahi hua");
    
    });

  };

  const formatTime =(time) =>{
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2,'0')}`;
  }



  useEffect(() => {
    ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict');
    ace.config.set('workerPath', '/node_modules/ace-builds/src-noconflict');
  }, []);

 
  const formatedQuestion = currentTopic[id].question.replace(/\n/g, "<br />");

  const handleChange = (newcode) => {
    setCode(newcode);
  };

  const handleCheckQues = () => {
    const Element = document.getElementById(`c${id}`);


 


    const tick = document.getElementById('tick-con');
    if (code === currentTopic[id].correct_code) {
      tick.style.display = "block";
      Element.style.backgroundColor = "rgb(35, 249, 56)";
      Element.style.color = "white";
      setCount(count + 1);
    } else {
     setCode(currentTopic[id].code);
      tick.style.display = "none";
    }
  };

  const handleList = () => {
    const tick = document.getElementById('tick-con');
  
      tick.style.display = "none";
    const nav = document.getElementById('nav');
    nav.style.display = "block";
    const close =document.getElementById('close');
    close.style.display='block';
    

  };

  const handleClose = () => {
    const nav = document.getElementById('nav');
    nav.style.display = "none";
    const close =document.getElementById('close');
    close.style.display='none';
  };

  const handleCategory = (category) => {
    setCurrentTopic(questionData[category]);
  /*  setCurrentQuestion(questionData[category][0]);*/
    const nav = document.getElementById('nav');
    nav.style.display = "block";
    const close =document.getElementById('close');
    close.style.display='block';
    const tick = document.getElementById('tick-con');

      tick.style.display = "none";
  };

  const handleListQues = (index) => {
    setId(index);
    setCode(currentTopic[index].code);
     /* setCurrentQuestion(currentTopic[0]);*/
   
    const nav = document.getElementById('nav');
    nav.style.display = "none";
    const close =document.getElementById('close');
    close.style.display='none';
    const tick = document.getElementById('tick-con');
   
      tick.style.display = "none";
  };

  const handleNext = () => {
    if (id === currentTopic.length - 1) {
    
      setId(0);
      setCode(currentTopic[0].code);

    } else {
      setCode(currentTopic[id+1].code);
      setId(id + 1);
      
    }
    const tick = document.getElementById('tick-con');
    tick.style.display = "none";
  };

  return (
    <div className="Home">
      <div className='header'>
        <img src={logo} alt="error" className='logo' />
        <p className='title'>Adicshan</p>
      </div>


      <div className='topic'>
        <div style={{padding:"10px",position:"absolute",top:"3rem",left:"0",backgroundColor:"aliceBlue"}}>
        <img id='list' onClick={handleList} src={list} alt='error' style={{ width: "30px", backgroundColor: "transparent", cursor: "pointer" }} />
        </div>
        

     <div className='corr-ques'>
         <div id='c0' className='c'>1</div>
         <div id='c1' className='c'>2</div>
         <div id='c2' className='c'>3</div>

     </div>


        <div style={{position:"absolute",left:"50%",transform:"translate(-50%)",fontSize:"20px",fontFamily:"sans-serif",fontWeight:"bold"}}><img src={timer} alt='error' style={{width:"20px"}} />{formatTime(time)}</div>
        <button id='end' style={{position:"absolute",display:"none",fontFamily:"sans-serif",fontWeight:"bold",width:"4rem",right:"20px",backgroundColor:"transparent",borderRadius:"5px"}} onClick={stopTimer}>End</button>
        
      </div>



      <div   className='container-con'>
        <div className='question-con'>
         
          <p className='disclaimer-con'>Remove the <code>"------"</code> from code and write the correct code</p>
          <p className='question_title-con'>{currentTopic[id].title}
            <img src={tick} alt='error' id='tick-con' />
          </p>
          <p className='question_ques-con' dangerouslySetInnerHTML={{ __html: formatedQuestion }}></p>
          <p style={{ color: "red" }}>{msg2}</p>
        </div>
        
        


        <div className='code-con'>
          <AceEditor
            mode="c_cpp" // Set mode to C++
            theme="monokai"
            name="code_editor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showGutter: isMobile,
            }}
            style={{ width: '100%', height: '100%', fontSize: "12px" }}
            value={code}
            onChange={handleChange} // Bind the code state to the editor
          
          />
          <div className='buttons-con'>
        

            <button className='next-con' onClick={handleNext}>Next</button>
            <button className='done-con' onClick={handleCheckQues}>Submit</button>
          </div>
        </div>
      </div>













      <div className="form-card">
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="upiID">UPI ID:</label>
          <input
            type="text"
            id="upiID"
            name="upiID"
            value={formData.upiID}
            onChange={handleFormChange}
          />
          {errors.upiID && <span className="error">{errors.upiID}</span>}
        </div>
        <button className='next' type="submit">Start</button>
      </form>
    </div>

      <div id='nav' style={{display:"none"}} className='navBar'>
      
        {currentTopic && currentTopic.map((item, index) => (
          <p key={index} onClick={() => handleListQues(index)} className='nav-list'>{item.title}</p>
        ))}
      </div>

      <img id='close' onClick={handleClose} src={close} alt='error' style={{ width: "15px",display:"none", cursor: "pointer" }} />
    </div>
  );
};

export default Contest;
