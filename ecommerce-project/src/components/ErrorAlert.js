function ErrorAlert({msg}){
    return(
        <>
        {console.log(msg)}
<div class="alert alert-danger fade show" role="alert">
  {msg}
</div>
</>
    )}
    export default ErrorAlert;