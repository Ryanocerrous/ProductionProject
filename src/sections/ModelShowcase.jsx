import ModelViewer from '../components/ModelViewer.jsx';
import ElectricBorder from '../components/ElectricBorder.jsx';

function ModelShowcase() {
  return (
    <section className="hero-showcase" id="model">
      <div className="hero-model">
        <ElectricBorder color="#7df9ff" speed={1.1} chaos={0.45} thickness={2.5} style={{ borderRadius: 32 }}>
          <div className="hero-model-frame">
            <span className="hero-model-label">Prototype chassis</span>
            <div className="hero-model-viewer">
              <ModelViewer
                url="/media/bytebite-unit.glb"
                width="100%"
                height="100%"
                enableManualZoom={true}
                enableMouseParallax={false}
                enableHoverRotation={false}
                autoRotate
                autoRotateSpeed={0.08}
                environmentPreset="night"
                showScreenshotButton={false}
                autoFrame
                defaultDistance={0.5}
                minZoomDistance={0.5}
                maxZoomDistance={10}
                enableManualRotation
              />
            </div>
            <p>
              Designed and built on Fusion 360 and rendered using Blender, showcasing the rugged and compact design ready&apos;for the harshest of field operations.
            </p>
          </div>
        </ElectricBorder>
      </div>
    </section>
  );
}

export default ModelShowcase;
