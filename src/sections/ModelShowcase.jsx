import ModelViewer from '../components/ModelViewer.jsx';
import ElectricBorder from '../components/ElectricBorder.jsx';

function ModelShowcase() {
  return (
    <section className="hero-showcase" id="model">
      <div className="hero-model">
        <ElectricBorder color="#7df9ff" speed={1.1} chaos={0.45} thickness={2.5} style={{ borderRadius: 32 }}>
          <div className="hero-model-frame">
            <span className="hero-model-label">Prototype device - Give it a spin!</span>
            <div className="hero-model-viewer">
              <ModelViewer
                url="/media/bytebite-unit.glb"
                width="100%"
                height="100%"
                enableManualZoom={false}
                enableMouseParallax={false}
                enableHoverRotation={false}
                autoRotate
                autoRotateSpeed={0.12}
                environmentPreset="night"
                showScreenshotButton={false}
                defaultRotationX={-8}
                defaultRotationY={24}
                defaultZoom={2.1}
                minZoomDistance={1.4}
                maxZoomDistance={3.5}
                scaleMultiplier={2.8}
                enableManualRotation
              />
            </div>
            <p>
              Designed and built with Fusion 360 and rendered using Blender, showcasing the rugged and compact design <br/> ready for the harshest of field operations.
            </p>
          </div>
        </ElectricBorder>
      </div>
    </section>
  );
}

export default ModelShowcase;
