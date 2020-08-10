/* 
Variables of Natural Forces
*/
var accDueToGravity = 10;
var weightOfQuadcopter ; 
var RPMofMotor1, RPMofMotor2, RPMofMotor3, RPMofMotor4;
var thrustOfMotor1, thrustOfMotor2, thrustOfMotor3, thrustOfMotor4;
var torqueOfMotor1 ,torqueOfMotor2 ,torqueOfMotor3 ,torqueOfMotor4 ;
var BatteyVoltage ;

var speed = 0.05;
var RotationSpeed = 0.025;

weightOfQuadcopter = .800;
BatteyVoltage = 24;






var MoveUp , MoveDown , RotateCounterClockwise ,RotateClockwise , MoveForward , MoveBackward;

var IsQuadcopterMovingUp , IsQuadcopterMovingDown , IsQuadcopterRotatingClockwise, IsQuadcopterRotatingCounterClockwise , IsQuadcopterMovingForward,IsQuadcopterMovingBackward; 

MoveUp = MoveDown = RotateCounterClockwise = RotateClockwise = MoveForward = MoveBackward = false;

function RotateQuadcopterCounterClockwise() {
	if(IsQuadcopterRotatingClockwise){
		IsQuadcopterRotatingClockwise  = RotateClockwise = false; 
	document.getElementById("RotateClockWise").setAttribute("class" , "");		
		return;
	}
	IsQuadcopterRotatingCounterClockwise = RotateCounterClockwise = true;
	document.getElementById("RotateCClockWise").setAttribute("class" , "btn");

} 

function RotateQuadcopterClockwise() {
	if(IsQuadcopterRotatingCounterClockwise){
		IsQuadcopterRotatingCounterClockwise = RotateCounterClockwise = false; 
	document.getElementById("RotateCClockWise").setAttribute("class" , "");
		return; 
	} 
	IsQuadcopterRotatingClockwise = RotateClockwise = true;
	document.getElementById("RotateClockWise").setAttribute("class" , "btn");

}

function MoveQuadcopterUp() {
	if(IsQuadcopterMovingDown){
		IsQuadcopterMovingDown = MoveDown = false;
	document.getElementById("MoveDown").setAttribute("class" , "");		
		return;
	} 
	IsQuadcopterMovingUp = MoveUp = true; 
	document.getElementById("MoveUp").setAttribute("class" , "btn");
}

function MoveQuadcopterDown() {
	if(IsQuadcopterMovingUp){
		IsQuadcopterMovingUp = MoveUp = false; 
		document.getElementById("MoveUp").setAttribute("class" , "");
		return; 
	} 
	IsQuadcopterMovingDown = MoveDown = true; 
	document.getElementById("MoveDown").setAttribute("class" , "btn");

} 
function MoveQuadcopterForward() {
	if(IsQuadcopterMovingBackward){
		IsQuadcopterMovingBackward = MoveBackward = false;
	document.getElementById("MoveBackward").setAttribute("class" , "");

		return; 
	}
	IsQuadcopterMovingForward = MoveForward = true;
	document.getElementById("MoveForward").setAttribute("class" , "btn");

} 
function MoveQuadcopterBackward() {
	if(IsQuadcopterMovingForward){
		IsQuadcopterMovingForward = MoveForward = false; 
	document.getElementById("MoveForward").setAttribute("class" , "");
		return; 
	}
	IsQuadcopterMovingBackward = MoveBackward = true; 
	document.getElementById("MoveBackward").setAttribute("class" , "btn");

}


var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth * .8, window.innerHeight * .85 ); 

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
scene.add(camera); 
camera.position.x = -0.004618797062759812;
camera.position.y = -3.946926493979386; 
camera.position.z = 2.0264367786701505;

document.getElementById('Quadcopter').appendChild( renderer.domElement );

var r = document.getElementById('Quadcopter'); 
var _animationControls = new THREE.TrackballControls(camera,r); 
_animationControls.addEventListener("change", render);

var QuadcopterLowerFrame = new THREE.Mesh(new THREE.BoxGeometry(.25,.5 ,.02) , new THREE.MeshBasicMaterial({color : "violet"}));
scene.add(QuadcopterLowerFrame); 
QuadcopterLowerFrame.position.x = 0; 
QuadcopterLowerFrame.position.y = 0;
QuadcopterLowerFrame.position.z = 0;

var QuadcopterUpperFrame = new THREE.Mesh(new THREE.BoxGeometry(.25,.5 ,.02) , new THREE.MeshBasicMaterial({color : 0x00ff00}));
scene.add(QuadcopterUpperFrame); 
QuadcopterUpperFrame.position.x = 0;
QuadcopterUpperFrame.position.y = 0;
QuadcopterUpperFrame.position.z = .05;

var QuadcopterHand1 = new THREE.Mesh(new THREE.BoxGeometry(.4,.02 ,.04) , new THREE.MeshBasicMaterial({})); 
scene.add(QuadcopterHand1);
QuadcopterHand1.position.y -= 0.2;
QuadcopterHand1.position.z += 0.03; 
QuadcopterHand1.rotation.z += 45 * Math.PI / 180;
QuadcopterHand1.position.x += -0.1;

var QuadcopterHand2 = new THREE.Mesh(new THREE.BoxGeometry(.4,.02 ,.04) , new THREE.MeshBasicMaterial({}));
scene.add(QuadcopterHand2); 
QuadcopterHand2.position.y -= 0.2; 
QuadcopterHand2.position.z += 0.03;
QuadcopterHand2.rotation.z += 135 * Math.PI / 180;
QuadcopterHand2.position.x += 0.1;

var QuadcopterHand3 = new THREE.Mesh(new THREE.BoxGeometry(.4,.02 ,.04) , new THREE.MeshBasicMaterial({color : "red"})); 
scene.add(QuadcopterHand3);
QuadcopterHand3.position.y += 0.2;
QuadcopterHand3.position.z += 0.03;
QuadcopterHand3.rotation.z += 45 * Math.PI / 180;
QuadcopterHand3.position.x += 0.1; 

var QuadcopterHand4 = new THREE.Mesh(new THREE.BoxGeometry(.4,.02 ,.04) , new THREE.MeshBasicMaterial({color : "red"}));
scene.add(QuadcopterHand4);
QuadcopterHand4.position.x += -0.1;
QuadcopterHand4.position.y += 0.2;
QuadcopterHand4.position.z += 0.03; 
QuadcopterHand4.rotation.z += 135 * Math.PI / 180; 

var Motor1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.01 , 100) , new THREE.MeshBasicMaterial({color : "red"}));
Motor1.position.x += 0.4 * Math.cos(45 * Math.PI / 180);
Motor1.position.y += (0.4 + .1) * Math.cos(45 * Math.PI / 180);
Motor1.position.z += 0.05;
Motor1.rotation.x +=  90 / 180 * Math.PI;

var Motor2 = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.01 , 100) , new THREE.MeshBasicMaterial({color : ""}));
Motor2.position.x += 0.4 * Math.cos(45 * Math.PI / 180); 
Motor2.position.y -= (0.4 + .1) * Math.cos(45 * Math.PI / 180);
Motor2.position.z += 0.05;
Motor2.rotation.x +=  90 / 180 * Math.PI;

var Motor3 = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.01 , 100) , new THREE.MeshBasicMaterial({color : ""})); 
Motor3.position.x -= 0.4 * Math.cos(45 * Math.PI / 180); 
Motor3.position.y -= (0.4 + .1) * Math.cos(45 * Math.PI / 180);; 
Motor3.position.z += 0.05;
Motor3.rotation.x +=  90 / 180 * Math.PI;

var Motor4 = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.01 , 100) , new THREE.MeshBasicMaterial({color : "red"}));
scene.add(Motor4);
Motor4.position.x -= 0.4 * Math.cos(45 * Math.PI / 180);
Motor4.position.y += (0.4 + .1) * Math.cos(45 * Math.PI / 180);;
Motor4.position.z += 0.05;
Motor4.rotation.x +=  90 / 180 * Math.PI;

var Quadcopter = new THREE.Object3D();
scene.add(Quadcopter); 
Quadcopter.add(QuadcopterLowerFrame);
Quadcopter.add(QuadcopterUpperFrame);
Quadcopter.add(QuadcopterHand1); 
Quadcopter.add(QuadcopterHand2);
Quadcopter.add(QuadcopterHand3);
Quadcopter.add(QuadcopterHand4);
Quadcopter.add(Motor1); 
Quadcopter.add(Motor2); 
Quadcopter.add(Motor3); 
Quadcopter.add(Motor4);

startAnimation(); 

function render(){renderer.render(scene,camera); 
}
var angle = 0;
function startAnimation(){
	document.getElementById("an").value = (Quadcopter.rotation.z / Math.PI * 180 ) % 360;;
	requestAnimationFrame(startAnimation);
	
	if(MoveUp)						Quadcopter.position.z += speed;
	if(MoveDown)					Quadcopter.position.z -= speed; 
	if(RotateClockwise)				{Quadcopter.rotation.z -= RotationSpeed;angle = (Quadcopter.rotation.z * 180 / Math.PI) % 360; }
	if(RotateCounterClockwise)		{Quadcopter.rotation.z += RotationSpeed;angle = (Quadcopter.rotation.z * 180 / Math.PI) % 360; } 
	if(MoveForward){
		angle = (Quadcopter.rotation.z / Math.PI * 180 ) % 360;	
		if(angle >=0 && angle < 90){			
			Quadcopter.position.x -= speed * Math.sin(angle / 180 * Math.PI);
			Quadcopter.position.y += speed * Math.cos(angle / 180 * Math.PI);	
		}
		else if(angle >=90 && angle < 180){		
			Quadcopter.position.x -= speed * Math.cos((angle - 90) / 180 * Math.PI) ;
			Quadcopter.position.y -= speed * Math.sin((angle - 90) / 180 * Math.PI) ;
		}
		else if(angle >=180 && angle < 270){		
			Quadcopter.position.x += speed * Math.sin((angle - 180) / 180 * Math.PI);
			Quadcopter.position.y -= speed * Math.cos((angle - 180) / 180 * Math.PI);
		}
		else if(angle >=270 && angle < 360){		
			Quadcopter.position.x += speed * Math.cos((angle - 270) / 180 * Math.PI);
			Quadcopter.position.y += speed * Math.sin((angle - 270) / 180 * Math.PI);
		}


		else if(angle < 0 && angle >= -90){	
			angle = 360 + angle ;			
			Quadcopter.position.x -= speed * Math.sin((angle) / 180 * Math.PI);
			Quadcopter.position.y += speed * Math.cos((angle) / 180 * Math.PI);
		}
		else if(angle < -90 && angle >= -180){	
			angle = 270 + angle;				
			Quadcopter.position.x -= speed * Math.cos((angle) / 180 * Math.PI);
			Quadcopter.position.y -= speed * Math.sin((angle) / 180 * Math.PI);
		}
		else if(angle < -180 && angle >= -270){	
			angle = -(-angle + 180) ;
			Quadcopter.position.x += speed * Math.sin(( angle) / 180 * Math.PI);
			Quadcopter.position.y -= speed * Math.cos(( angle) / 180 * Math.PI);
		}		
		else if(angle < -270 && angle >= -360){	
			angle = -(-angle + 90) ;
			Quadcopter.position.x -= speed * Math.cos((angle) / 180 * Math.PI);
			Quadcopter.position.y -= speed * Math.sin((angle) / 180 * Math.PI);
		}
	}
	if(MoveBackward){
		angle = (Quadcopter.rotation.z / Math.PI * 180 ) % 360;	
		if(angle >=0 && angle < 90){			
			Quadcopter.position.x += speed * Math.sin(angle / 180 * Math.PI);
			Quadcopter.position.y -= speed * Math.cos(angle / 180 * Math.PI);	
		}
		else if(angle >=90 && angle < 180){		
			Quadcopter.position.x += speed * Math.cos((angle - 90) / 180 * Math.PI) ;
			Quadcopter.position.y += speed * Math.sin((angle - 90) / 180 * Math.PI) ;
		}
		else if(angle >=180 && angle < 270){		
			Quadcopter.position.x -= speed * Math.sin((angle - 180) / 180 * Math.PI);
			Quadcopter.position.y += speed * Math.cos((angle - 180) / 180 * Math.PI);
		}
		else if(angle >=270 && angle < 360){		
			Quadcopter.position.x -= speed * Math.cos((angle - 270) / 180 * Math.PI);
			Quadcopter.position.y -= speed * Math.sin((angle - 270) / 180 * Math.PI);
		}


		else if(angle < 0 && angle >= -90){	
			angle = 360 + angle ;			
			Quadcopter.position.x += speed * Math.sin((angle) / 180 * Math.PI);
			Quadcopter.position.y -= speed * Math.cos((angle) / 180 * Math.PI);
		}
		else if(angle < -90 && angle >= -180){	
			angle = 270 + angle;				
			Quadcopter.position.x += speed * Math.cos((angle) / 180 * Math.PI);
			Quadcopter.position.y += speed * Math.sin((angle) / 180 * Math.PI);
		}
		else if(angle < -180 && angle >= -270){	
			angle = -(-angle + 180) ;
			Quadcopter.position.x -= speed * Math.sin(( angle) / 180 * Math.PI);
			Quadcopter.position.y += speed * Math.cos(( angle) / 180 * Math.PI);
		}		
		else if(angle < -270 && angle >= -360){	
			angle = -(-angle + 90) ;
			Quadcopter.position.x += speed * Math.cos((angle) / 180 * Math.PI);
			Quadcopter.position.y += speed * Math.sin((angle) / 180 * Math.PI);
		}
	}	
	_animationControls.update(); 
	
	renderer.render(scene,camera);
}