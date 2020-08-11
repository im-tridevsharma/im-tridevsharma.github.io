//chat control
localStorage.setItem("user","dummy");
let allowed_users = ["honey","sugar"];
document.getElementsByClassName('form-con')[0].style.display = "none";
function login() {
  let nuser = prompt("Who are you?");
  if(allowed_users.indexOf(nuser.toLowerCase()) !== -1){
    localStorage.setItem("user",nuser);
    init();
  }
}

function init() {
  let user = localStorage.getItem("user");
  if(allowed_users.indexOf(user.toLowerCase()) !== -1){

  document.getElementsByClassName('form-con')[0].style.display = "block";
   
   let chatform = document.getElementById('chatform');
    chatform.onsubmit = (event) => {
        event.preventDefault();

        let user = localStorage.getItem("user");
        if(user === null && allowed_users.indexOf(user)<0) {
            alert("You are not allowed to chat here");
        }else {
            let messageInput = document.getElementById('msg');
            message = messageInput.value.trim();
            if(message !== ''){
                firebase.database().ref("messages").push().set({
                    "sender" : user,
                    "message": message,
                    "sent" : new Date().toLocaleString()
                });
            }
            messageInput.value = "";
            messageInput.focus();
        }

        return false;
    }

    firebase.database().ref("messages").on("child_added", (data) => {
        let user = localStorage.getItem("user");
        let color = "";

        let messageInput = document.getElementById('msg');
        messageInput.onkeyup = () => {
          if(user==data.val().sender){
            document.getElementsByClassName('partner')[0].style.display = 'block';
          }else{
            document.getElementsByClassName('me')[0].style.display = 'block';
          }
        }

        if(user!==null && user===data.val().sender){
          color = "self";
        }else{
          color = "other"; 
        }
        let list = document.getElementById('show');
        let html = "<p class="+color+"><span class='sent'>"+data.val().sent+"</span><b>"+data.val().sender+"</b> :";
        html += "<i id='id"+data.key+"'>"+data.val().message+"</i>";
        if(user!==null && user===data.val().sender){
          html += "<i class='fas fa-trash' data-id='"+data.key+"' onclick='removeMe(this)'></i></p>";
        }
        list.innerHTML += html;
        document.getElementById('show').scrollTo(100,document.getElementById('show').scrollHeight + 100);
    });
  }
}

function removeMe(self) {
  let id = self.getAttribute("data-id");
  firebase.database().ref("messages").child(id).remove();
}
firebase.database().ref("messages").on("child_removed", (data) => {
  let removed = document.getElementById("id"+data.key);
  removed.innerHTML = "This message has been removed.";
  removed.parentNode.classList.add("removed");
});
init();
