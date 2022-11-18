const strengther = document.querySelector(".strengther");
const passwordInput = document.querySelector('input[type="text"]');
const passwordCheck = document.querySelector(".password-check");


passwordInput.addEventListener("input",updateStrengther);


function  updateStrengther() {
    const assessments = calculatePasswordStrength(passwordInput.value);

    let strength = 100;
    passwordCheck.innerHTML = "";

    assessments.forEach((assessment) => {
    if(assessment == null) return;

     strength -= assessment.strengthLost;
    const  pwdCheckEl = document.createElement("p");
    pwdCheckEl.innerHTML = assessment.pwdCheck;
    passwordCheck.appendChild(pwdCheckEl);
    });
    strengther.style.setProperty("--strength-amount",strength);
}

function calculatePasswordStrength(password) {
  const  assessment = []; 
  assessment.push(lengthAssessment(password));
     assessment.push(lowercaseAssessment(password));
     assessment.push(uppercaseAssessment(password));
     assessment.push(numberAssessment(password));
     assessment.push(specialCharacterAssessment(password));
     assessment.push(repeatCharactersAssessment(password));
  return assessment;

}

// length assessment function
function  lengthAssessment(password) {
    const length = password.length;
    

    if(length <= 5 ) {
      return {
      pwdCheck: "password is too short",
      strengthLost:40,  
      };
    
    }
    if(length <=  10) {
        return {
            pwdCheck: "password could be longer",
            strengthLost:15, 
    };
}
}

//lowercase character  assessment function
 function lowercaseAssessment(password) { 
   return characterTypeAssessment(password,/[a-z]/g,"lowercase characters");
 }


 //Uppercase Character  Assessment function
 function uppercaseAssessment(password) { 
  return characterTypeAssessment(password,/[A-Z]/g,"uppercase characters");
 }


//  Number assessment function 
function numberAssessment(password) {
  return characterTypeAssessment(password,/[0-9 ]/g, "numbers");
}


// Special Character Number assessment function 
function specialCharacterAssessment(password) { 
  return characterTypeAssessment(password, /[^0-9a-zA-Z\s]/g, "special characters");
}

  //  Character  Type Assessment function
function characterTypeAssessment(password, regX , assessmentType){
  const characterMatch = password.match(regX) || [];

  

  if(characterMatch.length === 0) {
    return {
        pwdCheck:`password has no ${assessmentType}`,
        strengthLost:20,   
    };
  }
  
  if(characterMatch.length <= 2) {
    return {
        pwdCheck: `password must have more ${assessmentType}`,
        strengthLost: 5, 
      };
     }
    }

    function  repeatCharactersAssessment(password) {
    const repeatCharMatch = password.match(/(.)\1/g) || [];

    if(repeatCharMatch.length > 0) {
      return {
        pwdCheck: "password has repeat characters",
        strengthLost: repeatCharMatch.length *10,
      };
    }
    }
 
