import LazyModelViewer from '../components/LazyModelViewer.jsx';
import ElectricBorder from '../components/ElectricBorder.jsx';

function ModelShowcase() {
  return (
    <section className="hero-showcase" id="model">
      <div className="hero-model">
        <ElectricBorder color="#7df9ff" speed={1.1} chaos={0.45} thickness={2.5} style={{ borderRadius: 32 }}>
          <div className="hero-model-frame">
            <span className="hero-model-label">Prototype chassis</span>
            <div className="hero-model-viewer">
              <LazyModelViewer
                url="/media/bytebite-unit.glb"
                width="100%"
                height="100%"
                enableManualZoom
                enableMouseParallax={false}
                enableHoverRotation={false}
                autoRotate
                autoRotateSpeed={0.25}
                environmentPreset="night"
                showScreenshotButton={false}
                autoFrame
                defaultDistance={0.6}
                minZoomDistance={0.25}
                maxZoomDistance={1.4}
              />
            </div>
            <p>
              Render live hardware tear-downs, asset animations, or field schematics directly in the hero viewport to prime
              operators on ByteBite&apos;s modular payload.
            </p>
          </div>
        </ElectricBorder>
      </div>
    </section>
  );
}

export default ModelShowcase;
