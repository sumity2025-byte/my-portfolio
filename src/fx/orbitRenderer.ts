import * as T from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/** Four interchangeable instruments on a mechanical orrery. Units are model-space millimetres. */
export function mountOrbit(host: HTMLElement) {
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6))
  renderer.setClearColor(0, 0)
  renderer.toneMapping=T.ACESFilmicToneMapping
  renderer.toneMappingExposure=.80
  const canvas = renderer.domElement
  Object.assign(canvas.style,{position:'absolute',inset:'0',width:'100%',height:'100%'})
  const scene=new T.Scene()
  const camera=new T.OrthographicCamera(-6,6,4,-4,.1,70)
  const room=new RoomEnvironment()
  const pmrem=new T.PMREMGenerator(renderer)
  const env=pmrem.fromScene(room,.035)
  scene.environment=env.texture
  scene.environmentIntensity=.90
  room.dispose();pmrem.dispose()
  const material=(color:string,metalness:number,roughness:number)=>new T.MeshStandardMaterial({color,metalness,roughness})
  const chrome=material('#d2dbdf',1,.16), brushed=material('#98a6a5',.83,.28)
  const alloy=material('#373d3e',.88,.23), dark=material('#171d20',.65,.32), ivory=material('#ece3c6',.42,.26)
  const tangerine=material('#fd5713',.43,.22),teal=material('#5bada6',.50,.28)
  const lacquer=new T.MeshPhysicalMaterial({color:'#46938f',roughness:.17,metalness:.32,clearcoat:1,clearcoatRoughness:.16})
  const face=material('#d5ceb8',.35,.37)
  const group=(parent:T.Object3D,x=0,y=0,z=0)=>{
    const g=new T.Group();g.position.set(x,y,z);parent.add(g);return g
  }
  const mesh=(parent:T.Object3D,geo:T.BufferGeometry,mat:T.Material,x=0,y=0,z=0)=>{
    const m=new T.Mesh(geo,mat);m.position.set(x,y,z);parent.add(m);return m
  }
  const drum=(parent:T.Object3D,r:number,h:number,mat:T.Material,y:number,x=0,z=0)=>
    mesh(parent,new T.CylinderGeometry(r,r,h,72),mat,x,y,z)
  const ring=(parent:T.Object3D,r:number,tube:number,mat:T.Material,y=0)=>{
    const m=mesh(parent,new T.TorusGeometry(r,tube,10,100),mat,0,y)
    m.rotation.x=Math.PI/2;return m
  }
  const box=(p:T.Object3D,w:number,h:number,d:number,m:T.Material,x:number,y:number,z:number)=>{
    return mesh(p,new RoundedBoxGeometry(w,h,d,2,Math.min(.028,h*.12)),m,x,y,z)
  }
  const globeRoot=group(scene)
  const table=group(globeRoot)
  // Lathed dial base, solid shoulder and alternating knurl grooves.
  drum(table,2.09,.13,alloy,-.38);drum(table,2.23,.22,chrome,-.22)
  drum(table,2.26,.22,dark,-.04);drum(table,2.17,.12,brushed,.11)
  drum(table,1.99,.06,dark,.19)
  ring(table,2.2,.026,tangerine,-.05)
  ring(table,1.85,.028,chrome,.24)
  const ticks=(parent:T.Object3D,r:number,y:number,n:number,mat:T.Material,majorStep=5)=>{
    const tickGeo=new T.BoxGeometry(1,1,1)
    const inst=new T.InstancedMesh(tickGeo,mat,n),o=new T.Object3D()
    for(let i=0;i<n;i++){
      const a=i/n*2*Math.PI,major=i%majorStep===0
      o.position.set(Math.sin(a)*r,y,Math.cos(a)*r);o.scale.set(major?.032:.016,.025,major?.17:.085)
      o.rotation.y=a;o.updateMatrix();inst.setMatrixAt(i,o.matrix)
    }
    parent.add(inst)
  }
  ticks(table,2.07,.19,120,ivory)
  drum(table,.86,.19,alloy,.36);drum(table,.72,.07,chrome,.49)
  drum(table,.31,.93,brushed,.87)
  for(const y of [.63,.73,.83,.93])ring(table,.32,.036,alloy,y)
  // Central instrument spins on an offset trunnion, like an armillary sphere.
  const bearing=group(globeRoot,0,2.10,0)
  const gimbal=group(bearing)
  gimbal.rotation.set(.44,-.24,.31)
  const outer=mesh(gimbal,new T.TorusGeometry(1.40,.108,14,112),chrome)
  const band=mesh(gimbal,new T.TorusGeometry(1.40,.043,10,112),tangerine,0,0,.095)
  outer.add(band)
  const mid=group(gimbal);mid.rotation.y=1.04
  mesh(mid,new T.TorusGeometry(1.24,.082,12,96),ivory)
  for(const side of [-1,1]){
    const cap=mesh(gimbal,new T.CylinderGeometry(.17,.17,.23,24),alloy,side*1.38,0,0)
    cap.rotation.z=Math.PI/2
    const pin=mesh(gimbal,new T.CylinderGeometry(.10,.10,.25,18),chrome,side*1.43,0,0)
    pin.rotation.z=Math.PI/2
  }
  const core=group(mid)
  mesh(core,new T.SphereGeometry(.84,48,40),lacquer)
  for(let i=-2;i<=2;i++){
    const y=i*.24
    ring(core,Math.sqrt(.846**2-y*y),.008,ivory,y)
  }
  for(let i=0;i<8;i++){
    const meridian=mesh(core,new T.TorusGeometry(.847,.008,5,72),brushed)
    meridian.rotation.y=i*Math.PI/8
  }
  const equator=group(core);equator.rotation.set(.62,0,.42)
  ring(equator,.86,.052,tangerine)
  const axle=mesh(mid,new T.CylinderGeometry(.052,.052,2.56,16),chrome)
  axle.rotation.z=.25
  const chassis=group(globeRoot)
  ring(chassis,2.86,.039,brushed,.47)
  ring(chassis,2.96,.016,chrome,.48)
  const platforms:T.Group[]=[], sat:T.Group[]=[]
  const radial=3.05
  for(let i=0;i<4;i++){
    const a=i*Math.PI/2+.73
    const arm=group(chassis);arm.rotation.y=a
    box(arm,.18,.14,radial,chrome,0,.48,radial*.50)
    box(arm,.07,.17,radial*.87,tangerine,.01,.48,radial*.53)
    const pod=group(arm,0,.50,radial)
    drum(pod,.91,.16,alloy,.01);drum(pod,.90,.085,chrome,.115);drum(pod,.83,.055,dark,.177)
    ring(pod,.84,.014,ivory,.213)
    ticks(pod,.78,.212,48,brushed,4)
    for(let j=0;j<3;j++){
      const b=j*Math.PI*2/3+.37
      drum(pod,.045,.026,chrome,.202,Math.sin(b)*.74,Math.cos(b)*.74)
    }
    platforms.push(pod)
    sat.push(group(pod,0,.23))
  }
  // Spur gears with actual teeth, smooth bores and radially drilled lightening holes.
  function gear(parent:T.Object3D,r:number,teeth:number,x:number,y:number,z:number,mat:T.Material){
    const shape=new T.Shape()
    for(let i=0;i<teeth*4;i++){
      const phi=i/(teeth*4)*Math.PI*2
      const radius=i%4===1||i%4===2?r:r*.84
      const px=Math.cos(phi)*radius,py=Math.sin(phi)*radius
      if(i===0)shape.moveTo(px,py);else shape.lineTo(px,py)
    }
    shape.closePath()
    const hole=(cx:number,cy:number,size:number)=>{const p=new T.Path();p.absarc(cx,cy,size,0,Math.PI*2,true);shape.holes.push(p)}
    hole(0,0,r*.18)
    for(let k=0;k<6;k++)hole(Math.cos(k*Math.PI/3)*r*.51,Math.sin(k*Math.PI/3)*r*.51,r*.12)
    const geo=new T.ExtrudeGeometry(shape,{depth:.14,bevelEnabled:true,bevelSegments:2,bevelThickness:.018,bevelSize:.012,steps:1,curveSegments:12})
    return mesh(parent,geo,mat,x,y,z)
  }
  box(sat[0],.67,.55,.18,alloy,-.21,.35,-.13)
  const gearA=gear(sat[0],.61,16,-.20,.91,-.03,ivory)
  const gearB=gear(sat[0],.38,10,.46,.44,.13,tangerine)
  // Three cast columns on a machined staircase foot.
  const bars:T.Group[]=[]
  for(let i=0;i<4;i++){
    const g=group(sat[1],(i-1.5)*.30,.05)
    const height=.40+i*.30
    box(g,.26,height,.47,[brushed,teal,ivory,tangerine][i],0,height*.50,0)
    box(g,.18,.022,.32,chrome,0,height+.014,0)
    bars.push(g)
  }
  // A silver pocket compass on a tilted instrument mount.
  const compass=group(sat[2],0,.59);compass.rotation.x=.61
  drum(compass,.67,.17,alloy,0);drum(compass,.61,.025,face,.10)
  ring(compass,.627,.039,chrome,.12);ticks(compass,.52,.13,32,dark,4)
  const pointer=group(compass,0,.185);pointer.rotation.y=-.63
  function needle(sign:number,mat:T.Material){
    const n=mesh(pointer,new T.ConeGeometry(.105,.47,4),mat,0,0,sign*.225)
    n.rotation.x=sign*Math.PI/2
  }
  needle(1,tangerine);needle(-1,alloy);drum(pointer,.085,.05,chrome,0)
  // Open book with double-curved leaves, gilt page edges, and a cloth cover.
  const book=group(sat[3],0,.36,.04);book.rotation.x=.35
  const leaves=(side:number,y:number,w:number,d:number,mat:T.Material)=>{
    const pos:number[]=[],idx:number[]=[]
    for(let i=0;i<=18;i++){
      const t=i/18
      for(const z of [-d/2,d/2])pos.push(side*w*t,y+.18*Math.sin(Math.PI*t)-.085*t,z)
      if(i>0){const a=(i-1)*2;idx.push(a,a+1,a+2,a+2,a+1,a+3)}
    }
    const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setIndex(idx);geo.computeVertexNormals()
    mat.side=T.DoubleSide
    mesh(book,geo,mat)
  }
  const paper=material('#f2e8cd',.08,.65), paperEdge=material('#b3a582',.20,.48)
  for(const side of [-1,1]){
    leaves(side,0,.70,1.08,teal)
    for(let i=1;i<=6;i++)leaves(side,i*.024,.66-i*.003,1.01,i%2?paperEdge:paper)
    for(let j=0;j<6;j++){
      const x=side*.34
      box(book,.36,.007,.012,brushed,x,.315,-.32+j*.12)
    }
  }
  ring(table,1.42,.03,alloy,.28)
  const ambient=new T.HemisphereLight('#fbf3da','#809299',.78);scene.add(ambient)
  const key=new T.DirectionalLight('#fff0ce',2);key.position.set(-5,8,5);scene.add(key)
  const rim=new T.DirectionalLight('#b8e9ef',2.2);rim.position.set(5,4,-4);scene.add(rim)

  let visible=true,frame=0,last=0,time=0,first:number|undefined
  let chapter=Number(host.dataset.chapter)||0,angle=-chapter*Math.PI/2,drag=0,px=0,py=0,lastX=0,held:number|null=null
  const look=new T.Vector3(0,1.37,0)
  function draw(now:number){
    frame=0
    if(!visible||document.hidden)return
    if(now-last>=1000/35){
      const dt=Math.min(.10,(now-last)/1000);last=now;time+=dt
      const age=first===undefined?0:(now-first)/1000
      const intro=1-T.MathUtils.smootherstep(age,0,1.55)
      const selected=Number(host.dataset.chapter)||0
      if(selected!==chapter){chapter=selected;drag=0}
      const target=-chapter*Math.PI/2+drag
      const difference=Math.atan2(Math.sin(target-angle),Math.cos(target-angle))
      angle+=difference*(1-Math.exp(-dt*4.2))
      chassis.rotation.y=angle+intro*.85
      const scroll=Math.max(0,Math.min(1,-host.getBoundingClientRect().top/Math.max(1,host.clientHeight)))
      const az=.36+px*.12+scroll*.16
      const elevation=.43-py*.055+scroll*.09+intro*.23
      camera.position.set(17*Math.sin(az)*Math.cos(elevation),1.37+17*Math.sin(elevation),17*Math.cos(az)*Math.cos(elevation));camera.lookAt(look)
      gimbal.rotation.y=-.25+Math.sin(time*.51)*.51+intro*1.4
      gimbal.rotation.z=.31+Math.sin(time*.48)*.145
      mid.rotation.y=1.04+Math.sin(time*.62)*.62
      core.rotation.y=time*.36
      gearA.rotation.z=-time*.53;gearB.rotation.z=time*.848
      pointer.rotation.y=-.55+Math.sin(time*.74)*.46
      platforms.forEach((pod,i)=>{
        const active=i===chapter?1:0
        pod.position.y=T.MathUtils.lerp(pod.position.y,.50+active*.21,.105)
        sat[i].position.y=.23+intro*(.42+i*.11)
        sat[i].rotation.y=-chassis.rotation.y-i*Math.PI/2-.73+az-.18
      })
      bars.forEach((bar,i)=>bar.scale.y=.9+.10*Math.sin(time*.88+i*.48))
      bearing.position.y=2.10+intro*.55
      renderer.render(scene,camera);first??=performance.now()
      const img=host.querySelector('img');if(img)img.style.opacity='0'
      host.dataset.rendered='true'
    }
    frame=requestAnimationFrame(draw)
  }
  function wake(){if(visible&&!document.hidden&&!frame)frame=requestAnimationFrame(draw)}
  const resize=new ResizeObserver(()=>{
    const {width,height}=host.getBoundingClientRect();if(!width||!height)return
    const aspect=width/height,half=Math.max(2.96,4.28/aspect)
    camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix()
    renderer.setSize(width,height,false);wake()
  })
  const onMove=(e:PointerEvent)=>{
    const b=host.getBoundingClientRect()
    px=(e.clientX-b.left)/b.width*2-1;py=(e.clientY-b.top)/b.height*2-1
    if(held===e.pointerId){drag+=(e.clientX-lastX)*.009;lastX=e.clientX}
  }
  const onDown=(e:PointerEvent)=>{if(e.button===0){held=e.pointerId;lastX=e.clientX;host.setPointerCapture(e.pointerId)}}
  const onUp=()=>{held=null}
  const onLeave=()=>{px=0;py=0}
  const lost=()=>{visible=false;canvas.style.visibility='hidden';const img=host.querySelector('img');if(img)img.style.opacity='1'}
  host.append(canvas);resize.observe(host)
  const seen=new IntersectionObserver(([e])=>{visible=e.isIntersecting;wake()});seen.observe(host)
  host.addEventListener('pointermove',onMove);host.addEventListener('pointerdown',onDown)
  host.addEventListener('pointerup',onUp);host.addEventListener('pointercancel',onUp);host.addEventListener('pointerleave',onLeave)
  document.addEventListener('visibilitychange',wake);canvas.addEventListener('webglcontextlost',lost)
  return ()=>{
    cancelAnimationFrame(frame);resize.disconnect();seen.disconnect();canvas.remove()
    host.removeEventListener('pointermove',onMove);host.removeEventListener('pointerdown',onDown)
    host.removeEventListener('pointerup',onUp);host.removeEventListener('pointercancel',onUp);host.removeEventListener('pointerleave',onLeave)
    document.removeEventListener('visibilitychange',wake);canvas.removeEventListener('webglcontextlost',lost)
    const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>()
    scene.traverse(obj=>{if(obj instanceof T.Mesh){geometries.add(obj.geometry);materials.add(obj.material as T.Material);if(obj instanceof T.InstancedMesh)obj.dispose()}})
    geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());env.dispose();renderer.dispose()
    const img=host.querySelector('img');if(img)img.style.opacity='1'
    delete host.dataset.rendered
  }
}
