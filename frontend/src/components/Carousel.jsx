const Carousel = () => {
  return (
    <div id="carouselExampleCaptions" class="carousel slide main-carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item main-carousel-item active">
          <img src="https://blenderartists.org/uploads/default/original/4X/c/6/8/c6844df952fc962e2d405570fc260a7a75efdc52.jpeg" class="d-block w-100" alt="..." />
          <div class="carousel-caption main-carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div class="carousel-item main-carousel-item">
          <img src="https://blenderartists.org/uploads/default/original/4X/2/5/e/25eae5af130ad4a59918d78887856e38d8d2dbcd.jpeg" class="d-block w-100" alt="..." />
          <div class="carousel-caption main-carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div class="carousel-item main-carousel-item">
          <img src="https://blenderartists.org/uploads/default/original/4X/9/3/0/930425e0895762b7ead9a2c8354bd0166b5c55eb.jpg" class="d-block w-100" alt="..." />
          <div class="carousel-caption main-carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
