function ShowSection()
{
    if(document.getElementById("contentControl").value == "Show Area 1")
    {
        document.getElementById("Thanksgiving").style.display = "initial";
        document.getElementById("Christmas").style.display = "none";
    }
    else if(document.getElementById("contentControl").value == "Show Area 2")
    {
        document.getElementById("Thanksgiving").style.display = "none";
        document.getElementById("Christmas").style.display = "initial";
    }
    else
    {
        document.getElementById("Thanksgiving").style.display = "none";
        document.getElementById("Christmas").style.display = "none";
    }
}