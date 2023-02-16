import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Game(){
  //player is the className of the 'th' elements;
    const [player,setPlayer] = React.useState("CercleElement");
  //show modal is the element that can show a modal if there is an element
    const [showModal,setShowModal]=React.useState(false)
  //index is table of possible possibilities to win
    const index=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]
    
    //React.useEffect(()=>{
    //  const th = document.querySelectorAll('th')
    //  for(let i=0;i<=8;i++){
    //    if(th[i].id==="5"){
    //      th[i].classList.add("CercleElement")
    //    }
    //  }
    //  
    //},[])

  //if the value of player is changed ... then we check if there is a winner by calling the function win();
    React.useEffect(()=>{
      win()

    },[player])

    
  // addBtn() is a function to add a button that can show the modal of a winner ;
    function addBtn(){
      const element = document.querySelector('.App')
            const btn = document.createElement("button");
            btn.setAttribute("type","button")
            btn.setAttribute("data-bs-toggle","modal")
            btn.setAttribute("data-bs-target","#exampleModal")
            btn.style.display="none";
            btn.id="btnShowModal";
            element.appendChild(btn);
      return btn;
    }


  // deleteBtn() is a function to delete the button that can show modal
    function deleteBtn(){
      const element = document.querySelector('.App')
      const btn = document.querySelector("#btnShowModal")
      element.removeChild(btn);
    }

  //check() is a function to make sure the game is over without a winner
    function check(){
      let etat= true;
      const th = document.querySelectorAll('th');
      th.forEach(t=>{
        if(t.className==="")
          etat=false;
      })
      return etat;
    }

  //replayAfterErr() is a function to confirm a replay of the game
    function replayAfterErr() {
      confirmAlert({
        title: 'Confirm',
        message: 'DO YOU WANT TO REPLAY THE GAME ?',
        buttons: [
          {
            label: 'Yes',
            onClick: replay
          },
          {
            label: 'No',
            onClick: () => {return}
          }
        ]
      });
    }

  // win() is a function to check if there is a winner or not
    function win(word=""){
      const th = document.querySelectorAll('th')
      for(let i=0;i<index.length;i++){
        const [a,b,c] = index[i]
        if(th[a].className===player && th[b].className===player && th[c].className===player ){
          setShowModal(true)
          setTimeout(() => {
            addBtn().click()
          }, 10)
          return true
        }
      }
      return false
    }

  // play() is the function called when click on the 'th' element and they cant change the class of the 'th' element and change value of player state;
    function play(e) {
      if (check()){
        replayAfterErr()
      }
      if(e.target.className !== "" || win()) return;
      if (player === "XElements") {
        e.target.classList.remove("XElements");
        e.target.classList.add("CercleElement");
        setPlayer("CercleElement");
      } else {
        e.target.classList.remove("CercleElement");
        e.target.classList.add("XElements");
        setPlayer("XElements");
      }
      
    }

  //replay() is the function called when the player want to replay the game (if there is a winner or game over without winner);
    function replay(){
      const th = document.querySelectorAll('th')
      th.forEach(t => {
        t.className=""
      });
      setShowModal(false)
      const btn = document.querySelector("#btnShowModal")
      if(document.contains(btn))
        deleteBtn()
    }

    return(
    <div className="App" >
      <div className="container">
          <div className="row ">
            <div className="col-md-6 mx-auto">
            <div className="table-container">
              <table className="table table-bordered bg-light">
                <tbody>
                  <tr className="ThElements">
                    <th onClick={(e)=>play(e)}>&nbsp;</th>
                    <th onClick={(e)=>play(e)}>&nbsp;</th>
                    <th onClick={(e)=>play(e)} id="5">&nbsp; </th>
                  </tr>
                  <tr className="ThElements">
                    <th onClick={(e)=>play(e)}>&nbsp;</th>
                    <th onClick={(e)=>play(e)}>&nbsp;</th>
                    <th onClick={(e)=>play(e)} id="5">&nbsp;</th>
                  </tr>
                  <tr className="ThElements">
                    <th onClick={(e)=>play(e)}>&nbsp;</th>
                    <th onClick={(e)=>play(e)}>&nbsp;</th>
                    <th onClick={(e)=>play(e)} id="5">&nbsp; </th>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>
      </div>
      {showModal &&(<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">Congratulations!</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center">
      <p className="lead">Player {player==="XElements"? "X": "O"} has won the game!</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={replay} className="btn btn-primary" data-bs-dismiss="modal">Replay</button>
        
      </div>
    </div>
  </div>
</div>)}
    </div>
    )
}
export default Game;