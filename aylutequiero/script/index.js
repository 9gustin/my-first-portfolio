//Section: AddEventListeners
document.querySelector('#img-save').addEventListener('click', Login);

//Section: JS Default
function viewPassword(){
    setDisplay('#input-password', 'block');
    setDisplay('#option-save', 'block');
    setDisplay('#option-down', 'none');
}
function setDisplay(selector, display){
    document.querySelector(selector).style.display = display;
}
function Login(){
    let username = document.querySelector('#txtUsername').value;
    let password = document.querySelector('#txtPassword').value;

    if(username && password && username.trim() !== '' && password.trim() !== ''){
        let user = users.find(user => user.username == username && user.password == password);
        if(user){
            sessionStorage.setItem('userAA', username);
            window.location = './pages/In';
        }
        else{
            LoginFailed();
        }
    }
   
}
function LoginFailed(){
    setDisplay('#login-failed', 'block');
}