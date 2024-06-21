import React, { useState, useEffect } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AceEditor from 'react-ace';

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
import c1 from './images/c++1.png';
import c2 from './images/c++2.png';

import questionsData from './ques.json';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth > 768);
 
  const [msg2,setMsg2]  = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState(questionsData);
  const [currentTopic, setCurrentTopic] = useState(questionsData.Practice);
  const [id, setId] = useState(0);
  const [code, setCode] = useState(currentTopic[id].code);
  
 const handleContest = () =>{
  navigate('/contest');
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
   

    const tick = document.getElementById('tick');
    if (code === currentTopic[id].correct_code) {
      tick.style.display = "block";
    } else {
     setCode(currentTopic[id].code);
      tick.style.display = "none";
    }
  };

  const handleList = () => {
    const tick = document.getElementById('tick');
  
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
    const tick = document.getElementById('tick');

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
    const tick = document.getElementById('tick');
   
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
    const tick = document.getElementById('tick');
    tick.style.display = "none";
  };

  return (
    <div className="Home">
      <div className='header'>
        <img src={logo} alt="error" className='logo' />
        <p className='title'>Adicshan</p>
        <button className='contest-btn' onClick={handleContest} >Contest</button>
      </div>


      <div className='topic'>
        <div style={{padding:"10px",position:"absolute",top:"3rem",left:"0",backgroundColor:"aliceBlue"}}>
        <img id='list' onClick={handleList} src={list} alt='error' style={{ width: "30px", backgroundColor: "transparent", cursor: "pointer" }} />
        </div>
        {
          Object.keys(questionData).map((category, index) => (
            <span className='topic_con' style={{ cursor: "pointer", marginLeft: "40px", fontFamily: "sans-serif", fontWeight: "bold" }} key={index} onClick={() => handleCategory(category)}>{category}</span>
          ))
        }
      </div>



      <div className='container'>
        <div className='question'>
         
          <p className='disclaimer'>Remove the <code>"------"</code> from code and write the correct code</p>
          <p className='question_title'>{currentTopic[id].title}
            <img src={tick} alt='error' id='tick' />
          </p>
          <p className='question_ques' dangerouslySetInnerHTML={{ __html: formatedQuestion }}></p>
          <p style={{ color: "red" }}>{msg2}</p>
        </div>
        
        


        <div className='code'>
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
          <div className='buttons'>
        

            <button className='next' onClick={handleNext}>Next</button>
            <button className='done' onClick={handleCheckQues}>Submit</button>
          </div>
        </div>
      </div>


      <div id='nav' className='navBar'>
      
        {currentTopic && currentTopic.map((item, index) => (
          <p key={index} onClick={() => handleListQues(index)} className='nav-list'>{item.title}</p>
        ))}
      </div>

      <img id='close' onClick={handleClose} src={close} alt='error' style={{ width: "15px", cursor: "pointer" }} />
    </div>
  );
};

export default Home;
