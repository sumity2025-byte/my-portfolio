import * as T from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/** Scale model of the store process, with a receiving lane, storage racks and dispatch. */
export function mountStore(host: HTMLElement) {
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
  renderer.setClearColor(0, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = T.PCFShadowMap
  renderer.shadowMap.autoUpdate = false
  renderer.shadowMap.needsUpdate = true
  const canvas = renderer.domElement
  Object.assign(canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' })
  const world = new T.Scene()
  const camera = new T.OrthographicCamera(-9, 9, 7, -7, 0.1, 90)
  const cube = new T.BoxGeometry()
  const materials = new Map<string, T.MeshStandardMaterial>()
  type Lift = { height: number; delay: number }
  const batches = new Map<string, { matrix: T.Matrix4; lift?: Lift }[]>()
  const liftedInstances: { mesh: T.InstancedMesh; index: number; base: T.Matrix4; lift: Lift }[] = []
  const liftedSigns: { mesh: T.Mesh; baseY: number; lift: Lift }[] = []
  let lift: Lift | undefined
  const labels: T.Texture[] = []
  const transform = new T.Object3D()
  const ink = '#212a2e', steel = '#4c585a', orange = '#fe6928', white = '#e1ded0'
  function mat(color: string) {
    if (!materials.has(color)) materials.set(color, new T.MeshStandardMaterial({ color, roughness: 0.69, metalness: 0.19 }))
    return materials.get(color)!
  }
  function box(x: number, y: number, z: number, w: number, h: number, d: number, color: string, tilt = 0) {
    transform.position.set(x, y, z)
    transform.scale.set(w, h, d)
    transform.rotation.set(0, 0, tilt)
    transform.updateMatrix()
    if (!batches.has(color)) batches.set(color, [])
    batches.get(color)!.push({ matrix: transform.matrix.clone(), lift })
  }
  function part(geometry: T.BufferGeometry, material: T.Material, x: number, y: number, z: number) {
    const mesh = new T.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    mesh.receiveShadow = mesh.castShadow = true
    world.add(mesh)
    return mesh
  }
  function plate(w: number, h: number, d: number, y: number, color: string, radius: number) {
    return part(new RoundedBoxGeometry(w, h, d, 2, radius), mat(color), 0, y, 0)
  }
  function sign(text: string, w: number, h: number, x: number, y: number, z: number, background: string, foreground: string, floor = false) {
    const sheet = document.createElement('canvas')
    sheet.width = 640; sheet.height = 120
    const pen = sheet.getContext('2d')!
    pen.fillStyle = background; pen.fillRect(0, 0, 640, 120)
    pen.fillStyle = foreground; pen.textBaseline = 'middle'; pen.textAlign = 'center'
    pen.font = 'bold 68px monospace'; pen.fillText(text, 320, 65, 595)
    const tex = new T.CanvasTexture(sheet); tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 4
    labels.push(tex)
    const p = part(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: tex }), x, y, z)
    if (lift) liftedSigns.push({ mesh: p, baseY: y, lift })
    p.castShadow = false
    if (floor) p.rotation.x = -Math.PI / 2
  }

  // Laminated plinth and expansion joints in the concrete.
  plate(13.5, 0.40, 9.7, -0.63, '#242c31', 0.14)
  plate(13.38, 0.07, 9.58, -0.395, '#c6cab9', 0.025)
  plate(13.48, 0.40, 9.68, -0.19, '#626b69', 0.11)
  box(0, 0.032, 0, 13.13, 0.045, 9.30, '#8e9690')
  for (let z = -4; z <= 4; z += 1) box(0, .058, z, 13.1, .007, .012, '#67726d')
  for (let x = -6; x <= 6; x += 1) box(x, .058, 0, .013, .007, 9.2, '#67726d')
  sign('DARK STORE   /   DISPATCH', 4.0, .28, 2.6, -.18, 4.846, '#4b5554', '#f2ecd6')
  // Corrugated rear wall, conduits, light bars and shutter.
  box(-.08, 1.47, -4.5, 13.02, 2.86, .12, '#6f7f7d')
  for (let x = -6.42; x < 6.45; x += .29) box(x, 1.50, -4.377, .048, 2.62, .09, '#a1ada4')
  box(0, 2.98, -4.49, 13.18, .15, .25, '#c4c7b7')
  box(0, .29, -4.34, 13, .17, .10, orange)
  for (const x of [-5.35, -.44, 4.5]) {
    box(x, 2.62, -4.27, 2.04, .13, .17, steel)
    box(x, 2.61, -4.165, 1.86, .088, .045, '#faf6db')
  }
  box(4.28, 1.36, -4.30, 2.52, 2.62, .16, ink)
  for (let i = 0; i < 14; ++i) box(4.27, .28+i*.145, -4.17, 2.21, .116, .07, '#acb5ad')
  sign('RECEIVING', 1.65, .27, 4.27, 2.44, -4.15, ink, white)
  sign('FULFILMENT', 3.20, .49, -3.3, 2.22, -4.17, '#384644', '#eee9d6')

  const rackCenters = [-2.8, -.22, 2.30]
  const palette = ['#d6b381', '#aa825c', '#c39b70', '#e7d2a9', '#8f6647']
  let seed = 427
  const random = () => { seed = seed * 16807 % 2147483647; return seed / 2147483647 }
  rackCenters.forEach((z, aisle) => {
    // High bays at the back, low bays at front for a cutaway line of sight.
    const levels = 3 - Number(aisle === 2)
    const rackLift = { height: 1.15 + aisle*.4, delay: aisle*.13 }
    lift = rackLift
    for (const x of [-5.80, -3.32, -.84, 1.64]) {
      for (const dz of [-.46,.46]) {
        box(x, levels*.36+.21, z+dz, .09, levels*.72+.28, .09, '#425764')
        box(x, .14, z+dz, .18, .10, .18, ink)
      }
      for (let k = 0; k < levels; k++) box(x, .23+k*.72, z, .10, .10, 1.04, steel)
    }
    for (let l = 0; l < levels; ++l) {
      lift = rackLift
      const y = .27 + l*.72
      box(-2.08,y,z,7.63,.10,1.01,'#bfc0b0')
      box(-2.08,y-.04,z+.52,7.67,.13,.10,orange)
      box(-2.08,y-.04,z-.52,7.67,.13,.10,orange)
      for (let bay=0;bay<3;++bay) {
        lift = { height: 2.2 + l*.28, delay: .30 + aisle*.14 + bay*.06 }
        const left = -5.62+bay*2.48
        for (let b=0;b<3;++b) {
          if (random() < .12) continue
          const x = left+.37+b*.74, h=.30+random()*.31, w=.53+random()*.15, d=.62+random()*.18
          const cy=y+.05+h/2
          const color = (bay+l+aisle)%6===2 ? '#6f9391' : palette[Math.floor(random()*palette.length)]
          box(x,cy,z,w,h,d,color)
          box(x+.035,cy+h/2+.004,z,.07,.009,d*.98,'#dac19b')
          box(x+.035,cy+h*.32,z+d/2+.005,.07,h*.35,.009,'#c7ab86')
          if ((b+bay+l)%3===0) box(x-.11,cy+.02,z+d/2+.007,.18,.095,.012,'#f4ebd5')
        }
      }
    }
    lift = rackLift
    // Aisle identification flag.
    box(1.67,levels*.72+.28,z,.07,.53,.08,ink)
    sign('A—0'+(aisle+1),.83,.31,1.66,levels*.72+.51,z+.05, '#283136', '#ffb75f')
  })
  lift = undefined
  // Dispatch conveyor: twin channels, individual rollers, packed outgoing cartons.
  const beltX = 4.63, beltZ = 1.62
  for (const x of [beltX-.67,beltX+.67]) {
    box(x,.78,beltZ,.10,.2,3.24,orange)
    for (const z of [beltZ-1.25,beltZ+1.25]) box(x,.40,z,.11,.72,.11,ink)
  }
  for (let i=0;i<18;i++) box(beltX,.79,beltZ-1.48+i*.172,1.27,.09,.105,'#adb6b5')
  for (const z of [beltZ-.82,beltZ+.60]) {
    box(beltX,1.12,z,.95,.57,.70,'#c9a076')
    box(beltX,1.413,z,.10,.015,.70,'#e7d4ad')
  }
  for (let i=0; i<5; i++) box(5.95,.08,-2.85+i*.55,.54,.012,.15,'#e7c06b')
  // A dispatch worker and a stack of returnable totes establish the scale.
  const wx=5.65, wz=2.36
  for (const step of [-.10,.10]) {
    box(wx+step,.32,wz,.14,.48,.16,'#344549')
    box(wx+step,.11,wz-.04,.16,.13,.25,ink)
  }
  part(new T.CapsuleGeometry(.17,.26,3,8),mat('#f8943c'),wx,.82,wz)
  box(wx,.80,wz+.142,.33,.062,.055,'#f4e5af')
  part(new T.SphereGeometry(.137,12,8),mat('#bd8c6e'),wx,1.23,wz)
  part(new T.SphereGeometry(.152,12,8,0,Math.PI*2,0,Math.PI/2),mat('#ede2ba'),wx,1.264,wz)
  for (const side of [-1,1]) box(wx+side*.20,.78,wz-.04,.095,.34,.13,'#ce9765',side*.15)
  for (let i=0;i<3;i++) {
    const y=.20+i*.23
    box(5.73,y,-.51,.77,.23,.65,'#4f7977')
    box(5.73,y+.10,-.51,.82,.06,.70,'#85a6a1')
    box(5.73,y+.01,-.18,.23,.055,.016,'#344942')
  }
  for (const x of [2.94,5.68]) {
    part(new T.CylinderGeometry(.078,.10,.55,10),mat('#e9a944'),x,.34,-3.99)
    part(new T.CylinderGeometry(.08,.082,.09,10),mat(ink),x,.47,-3.99)
  }
  // Rounded bends maintain an even luminous path through the picking aisles.
  const stops = [[4.25,-3.55],[2.58,-3.55],[2.58,-1.53],[-6.27,-1.53],[-6.27,1.04],[2.67,1.04],[2.67,3.63],[4.64,3.63]]
  const vector = ([x,z]:number[]) => new T.Vector3(x,.107,z)
  const route = new T.CurvePath<T.Vector3>()
  let last = vector(stops[0])
  for (let i=1;i<stops.length-1;i++) {
    const bend = vector(stops[i])
    const before = bend.clone().addScaledVector(vector(stops[i-1]).sub(bend).normalize(),.23)
    const after = bend.clone().addScaledVector(vector(stops[i+1]).sub(bend).normalize(),.23)
    route.add(new T.LineCurve3(last,before)); route.add(new T.QuadraticBezierCurve3(before,bend,after))
    last=after
  }
  route.add(new T.LineCurve3(last,vector(stops[stops.length-1])))
  const routeMesh = part(new T.TubeGeometry(route,220,.054,5,false),new T.MeshBasicMaterial({color:'#ff7627'}),0,0,0)
  const beacon = part(new T.SphereGeometry(.14,12,8),new T.MeshBasicMaterial({color:'#fff5bd'}),0,0,0)
  const halo = part(new T.RingGeometry(.18,.26,32),new T.MeshBasicMaterial({ color:'#ff982a',transparent:true,opacity:.9 }),0,0,0)
  halo.rotation.x = -Math.PI/2
  for (const [color, matrices] of batches) {
    const mesh = new T.InstancedMesh(cube, mat(color), matrices.length)
    matrices.forEach(({ matrix, lift: motion }, i) => {
      mesh.setMatrixAt(i,matrix)
      if (motion) liftedInstances.push({ mesh, index: i, base: matrix, lift: motion })
    })
    mesh.receiveShadow = mesh.castShadow = true
    world.add(mesh)
  }
  world.add(new T.HemisphereLight('#e5eeff','#666254',1.85))
  const key = new T.DirectionalLight('#fff1d9',3.15)
  key.position.set(-7,14,8); key.castShadow=true; key.shadow.mapSize.set(1024,1024)
  Object.assign(key.shadow.camera,{left:-11,right:11,top:10,bottom:-10})
  key.shadow.normalBias=.025; key.shadow.bias=-.00022
  world.add(key)
  const rim=new T.DirectionalLight('#aec4d0',1.3);rim.position.set(8,6,-5);world.add(rim)

  let yaw=.58, pitch=.57, drag=0, targetX=0, targetY=0, pointer: number|null=null, previous=0
  let frame=0, elapsed=0, lastTime=0, visible=true
  const center=new T.Vector3(0,.80,0)
  const animatedMatrix = new T.Matrix4()
  let openingStart: number | undefined
  let assembled = false
  const liftOffset = (time: number, motion: Lift) =>
    motion.height * (1 - T.MathUtils.smootherstep(time, motion.delay, motion.delay + .83))
  function assemble(time: number) {
    for (const { mesh, index, base, lift: motion } of liftedInstances) {
      animatedMatrix.copy(base)
      animatedMatrix.elements[13] += liftOffset(time, motion)
      mesh.setMatrixAt(index, animatedMatrix)
      mesh.instanceMatrix.needsUpdate = true
    }
    for (const { mesh, baseY, lift: motion } of liftedSigns) mesh.position.y = baseY + liftOffset(time, motion)
    const reveal = T.MathUtils.smoothstep(time,.20,1.66)
    routeMesh.geometry.setDrawRange(0, 3 * Math.floor(routeMesh.geometry.index!.count * reveal / 3))
    renderer.shadowMap.needsUpdate = true
    assembled = time >= 1.66
    return reveal
  }
  function render(now: number) {
    frame=0
    if (!visible || document.hidden) return
    const dt=Math.min((now-lastTime)/1000,.08)
    if (dt >= 1/35) {
      lastTime=now; elapsed+=dt
      // Start on the first drawn frame, after any module, model or shader startup delay.
      const opening = openingStart === undefined ? 0 : (now-openingStart)/1000
      const pathReveal = assembled ? 1 : assemble(opening)
      const orbit = 1 - T.MathUtils.smootherstep(opening, 0, 1.65)
      const scroll=Math.min(1,Math.max(0,-host.getBoundingClientRect().top / Math.max(1,host.clientHeight)))
      const plan = host.dataset.view === 'plan'
      const angle = plan ? .02 : .58+drag+targetX*.10+scroll*.26+Math.sin(elapsed*.30)*.024
      const elevation = plan ? 1.49 : .57-targetY*.045+scroll*.08
      yaw += (angle-yaw)*.11
      pitch += (elevation-pitch)*.1
      const azimuth = yaw - orbit*.66
      const incline = pitch + orbit*.17
      camera.position.set(Math.sin(azimuth)*28*Math.cos(incline),.80+28*Math.sin(incline), Math.cos(azimuth)*28*Math.cos(incline))
      camera.lookAt(center)
      const pt=route.getPointAt(assembled ? (1 + Math.max(0,opening-1.66)*.064)%1 : pathReveal)
      beacon.position.copy(pt); beacon.position.y+=.064
      halo.position.copy(pt);halo.scale.setScalar(1+Math.sin(elapsed*5)*.16)
      renderer.render(world,camera)
      openingStart ??= performance.now()
      const poster = host.querySelector('img')
      if (poster) poster.style.opacity='0'
      host.dataset.rendered='true'
    }
    frame=requestAnimationFrame(render)
  }
  function wake() {
    if (visible && !document.hidden && !frame) frame=requestAnimationFrame(render)
  }
  const resize=new ResizeObserver(() => {
    const {width,height} = host.getBoundingClientRect()
    if (!height||!width) return
    const aspect=width/height, half=Math.max(5.38,8.66/aspect)
    camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half
    camera.updateProjectionMatrix();renderer.setSize(width,height,false);wake()
  })
  function move(e:PointerEvent) {
    const bounds=host.getBoundingClientRect()
    targetX=(e.clientX-bounds.left)/bounds.width*2-1
    targetY=(e.clientY-bounds.top)/bounds.height*2-1
    if (pointer===e.pointerId) {drag=T.MathUtils.clamp(drag+(e.clientX-previous)*.008,-1.20,1.45);previous=e.clientX}
  }
  function down(e:PointerEvent) {if (e.button!==0) return;pointer=e.pointerId;previous=e.clientX;host.setPointerCapture(e.pointerId)}
  function up(){pointer=null}
  function leave(){targetX=0;targetY=0}
  function lost() {visible=false; canvas.style.visibility='hidden'; const img=host.querySelector('img');if(img)img.style.opacity='1'}
  host.append(canvas)
  resize.observe(host)
  const sight=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;wake()})
  sight.observe(host)
  host.addEventListener('pointermove',move);host.addEventListener('pointerdown',down)
  host.addEventListener('pointerup',up);host.addEventListener('pointercancel',up);host.addEventListener('pointerleave',leave)
  document.addEventListener('visibilitychange',wake);canvas.addEventListener('webglcontextlost',lost)
  return () => {
    cancelAnimationFrame(frame);resize.disconnect();sight.disconnect()
    host.removeEventListener('pointermove',move);host.removeEventListener('pointerdown',down)
    host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',up);host.removeEventListener('pointerleave',leave)
    document.removeEventListener('visibilitychange',wake);canvas.removeEventListener('webglcontextlost',lost)
    const geometries=new Set<T.BufferGeometry>(), usedMaterials=new Set<T.Material>()
    world.traverse(obj=>{if(obj instanceof T.Mesh){geometries.add(obj.geometry);usedMaterials.add(obj.material as T.Material);if(obj instanceof T.InstancedMesh)obj.dispose()}})
    geometries.forEach(g=>g.dispose());usedMaterials.forEach(m=>m.dispose());labels.forEach(t=>t.dispose())
    key.shadow.dispose();renderer.dispose();canvas.remove()
    const poster=host.querySelector('img');if(poster)poster.style.opacity='1'
    delete host.dataset.rendered
  }
}
