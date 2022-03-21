#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse1;
uniform vec2 mouse2;

uniform vec2 point1;
uniform vec2 point2;
uniform vec2 point3;


void main (void) {
  vec2 mst1 = mouse1.xy;
  vec2 mst2 = mouse2.xy;


  // Mouse 1
  vec2 st = 0.5*gl_FragCoord.xy/resolution.xy;
  st.y=1.0-st.y;

  float dist1 = distance(st.xy,mst1+point1.xy)*5.0;
  float dist2 = distance(st.xy,mst1+point2.xy)*5.0;
  float dist3 = distance(st.xy,mst1+point3.xy)*5.0;
  
  float color1=dist1*dist2*dist3;
  color1=floor(color1);
  
  if (mod(color1, 2.0)==0.0) {
    color1=0.0;
  }

  vec4 myColor= vec4(color1*100.0,color1*100.0,color1*100.0,1.0);

  // Mouse 2

  dist1 = distance(st.xy,mst2+point1.xy)*5.0;
  dist2 = distance(st.xy,mst2+point2.xy)*5.0;
  dist3 = distance(st.xy,mst2+point3.xy)*5.0;
  
  float color2=dist1*dist2*dist3;
  color2=floor(color2);
  
  if (mod(color2, 2.0)==0.0) {
    color2=0.2;
  }
  
  if (color2<color1) {
    myColor=vec4(color2,color2,color2,1.0);   
  }
  
  if (distance(mst1,st)<0.025) {
   // myColor=vec4(1.0,0.0,0.0,0.4);
  } 
  
  if ((abs(st.x)<0.025) || (abs(st.x)>0.975)) {
    myColor=vec4(0.0,1.0,1.0,1.0);
  }
  
  gl_FragColor = myColor;
}
