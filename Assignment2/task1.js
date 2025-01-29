/*
Name your files task1.html and task1.js.

In MadLibs (TM) the player provides a predetermined combination of nouns, 
verbs, adjectives, adverbs, etc and the generator fits those words into 
a predefined story. The result is often humorous as the player does 
not know the context that their provided words will be used in until 
after they are provided. Your MadLib generator should prompt the player 
for at least 8 words. Widgets R' Us doesn't care what the generated story
is and have given you (almost)total freedom in what kind of story to
generate. They only request that the story be safe for work and that 
you use each of the words the user provides at least once in the story. 
The UI should consist of input fields and a button, that when pressed
generates the story and puts it on the screen.

Other Technical Requirements

If the user fails to provide a word to one of the inputs the program 
should not crash. You should display a message to the user telling them
that they need to provide the missing word.

If the user generates a new story then the new story should replace the 
old story on the screen.

Each input element should have an id and an associated getElementById()
method call in the js file.

Do not user an html form
*/


function storyGenerator(){
    const noun1 = document.getElementById("noun1").value; //nouns, adjectives etc
    const noun2 = document.getElementById("noun2").value; 
    const adjective1 = document.getElementById("adjective1").value; 
    const adjective2 = document.getElementById("adjective2").value; 
    const adverb1 = document.getElementById("adverb1").value; 
    const adverb2 = document.getElementById("adverb2").value; 
    const verb1 = document.getElementById("verb1").value; 
    const verb2 = document.getElementById("verb2").value;

    //if statement checking that all inputs are present
    if (!noun1  || !noun2 || !adjective1 || !adjective2  || !adverb1 || !adverb2  || !verb1  || !verb2 ){
        alert("Please fill in all the inputs");
    }else{
            //const story = " WRITE THE STORY"
        const story = "Once upon a time, there was a " + noun1 + " who was very " + adjective1 + 
        ". This " + noun1 + " was always " + adverb1 + " " + verb1 + " and " + adverb2 + " " + verb2 +
        ". One day, the " + noun1 + " met a " + noun2 + " who was also very " + adjective2 + 
        ". The two of them became best friends and lived happily ever after. Until they didn't when "
        + noun1 + " killed " + noun2 + " with bad documentation on their cs homework. The end."
    
        document.getElementById("story").innerHTML = story;
    }



}