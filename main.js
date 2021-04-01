
function init() {

animateDiv(".a");
animateDiv(".b");
animateDiv(".c");

function updateScroll(){
    var h = $("#cons")[0].scrollHeight;
    $("#cons")[0].scrollTop = h;
    // after some time, cleanup the history
    if(h>=3000) {
	    $("#cons").text("");
            updateScroll();
    }
}

function getRotationDegrees(obj) {
	    var matrix = obj.css("transform");
	    if(matrix !== 'none') {
		            var values = matrix.split('(')[1].split(')')[0].split(',');
		            var a = values[0];
		            var b = values[1];
		            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		        } else { var angle = 0; }
	    return (angle < 0) ? angle + 360 : angle;
}

function addRotate(zdiv,add) {
    $(zdiv).css({ 'transform': 'rotate('+(getRotationDegrees($(zdiv))+1)+'deg)' });
}

function makeNewPosition(zdiv){
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 100;
    var w = $(window).width() - 100;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    return [nh,nw];    
}

function getPosition(zdiv){
let top= $(zdiv).offset().top;
let left= $(zdiv).offset().left;
let bottom= $(zdiv).offset().top + 144.42;
let right= $(zdiv).offset().left + 144.42;
console.log($(zdiv).width());
return [top,left,bottom,right]
}

function collision(div1,div2){
    [t1,l1,b1,r1]=getPosition(div1);
    [t2,l2,b2,r2]=getPosition(div2);
    if(b1<t2 || t1>b2 || r1<l2 || l1>r2) return false;
        return true;
}

setInterval(()=>{
    if(collision('.a','.b')){
        $('.a').stop();
        $('.b').stop();
    $("#cons").append("Une collision entre .a et .b a été évitée<br/>");
    updateScroll();
    }
    if(collision('.c','.a')){
        $('.c').stop();
        $('.a').stop();
    $("#cons").append("Une collision entre .a et .c a été évitée<br/>");
    updateScroll();}
    if(collision('.b','.c')){
        $('.b').stop();
        $('.c').stop();
    $("#cons").append("Une collision entre .b et .c a été évitée<br/>");
    updateScroll();}

    animateDiv(".a");
    animateDiv(".b");
    animateDiv(".c");

},1)



function animateDiv(zdiv){
    var newq = makeNewPosition(zdiv);
    var oldq = $(zdiv).offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    $(zdiv).animate(
	    { top: newq[0], left: newq[1] },
	    {
	      duration: speed,
              step: function(){ addRotate(zdiv,1); /* hint... */ },
              complete: function(){ animateDiv(zdiv); }
	    }
	    );
    $("#cons").append(zdiv+" going to ["+newq[0]+","+newq[1]+"]<br/>");
    updateScroll();
};

function calcSpeed(prev,next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    var greatest = x > y ? x : y;
    var speedModifier = Math.random()/2;
    if(speedModifier<0.05) speedModifier = 0.05;
    var speed = Math.ceil(greatest/speedModifier);
    return speed;
}

}

