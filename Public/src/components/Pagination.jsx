export default function Pagination({ page, setPage, totalPage }) {
  const createPagination = () => {
    let temp = [];
    for (let i = 1; i <= totalPage; i++) {
      temp.push(i);
    }
    return temp;
  };

  const pagination = createPagination();

  return (
    <>
      {/* Awal Pagination */}
      <div className="flex justify-center mt-10 gap-4">
        {page !== 1 && (
          <button className="border-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200" onClick={() => setPage(page - 1)}>
            Previous
          </button>
        )}
        {/* Tombol Halaman */}
        {pagination.map((p) => {
          // Tampilkan hanya halaman di sekitar page (maksimal 10)
          if (p === 1 || p === totalPage || (p >= page - 4 && p <= page + 4)) {
            return (
              <button key={p} onClick={() => setPage(p)} className={page === p ? "border-2 bg-blue-200 px-4 py-2 rounded-md hover:bg-gray-200" : "border-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"}>
                {p}
              </button>
            );
          }

          // Tampilkan "..." jika ada jarak halaman
          if ((p === page - 5 || p === page + 5) && p > 1 && p < totalPage) {
            return <span key={p}>...</span>;
          }

          return null;
        })}
        {page !== totalPage && (
          <button className="border-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200" onClick={() => setPage(page + 1)}>
            Next
          </button>
        )}
      </div>
      {/* Akhir Pagination */}
    </>
  );
}
