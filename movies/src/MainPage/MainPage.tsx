import Header from '../Header/Header';
import PageSelect from '../PageSelect/PageSelect';

function MainPage() {
  return (
    <>
      <div className="banner_start">
        <Header />
        <h2 className="title">
          We provide detailed descriptions of each film, trailers, ratings, and reviews to help you make an informed
          decision about which movie to watch.
        </h2>
      </div>
      <PageSelect />
    </>
  );
}

export default MainPage;
