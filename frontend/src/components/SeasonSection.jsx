const SeasonSection = () => {
  return (
    <section className="season">
 

      <div className="container">
        <div className="row box-seasons">
          <div className="col-md-6 col-lg-4">
            <div className="box-season box-season1">
              <h3>Gloves</h3>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="box-season box-season2">
              <h3>Crampons</h3>
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="box-season box-season3">
              <h3>Category</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="back-season">
      <div className="overlay-season">
        <div className="container">
          <h2 className="title-season">Winter season</h2>
          <p className="text-season">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            vitae?
          </p>
          <button className="btn-season btn">Discover more</button>
        </div>
      </div>
      </div>
      
    </section>
  );
};

export default SeasonSection;
