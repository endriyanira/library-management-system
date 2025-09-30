import axios from "axios";
import React, { useState, useEffect } from "react";
import API_ENDPOINTS from "../config/apiConfig";
import SpinnerAnimate from "../components/Icon/SpinnerAnimate";
import Pagination from "../components/Pagination";

const BookTableHeaderItems = ({ label }) => {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {label}
    </th>
  );
};

const BookManagementPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const ITEMS_PER_PAGE = 25;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const headerItems = [
    "Judul",
    "Penulis",
    "Kategori",
    "Tahun Terbit",
    "Stok",
    "Aksi",
  ];

  const fetchBooks = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_ENDPOINTS.book}?page=${page}&limit=${ITEMS_PER_PAGE}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setBooks(data.books || data);
      setCurrentPage(data.currentPage);
      setTotalItems(data.total);
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
      setError("Gagal memuat data buku. Silakan cek koneksi API.");
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      if (pageNumber !== currentPage) {
        setCurrentPage(pageNumber);
      }
    }
  };

  if (loading && totalItems === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerAnimate size="4" color="indigo" />
        <span className="ml-3 text-lg text-gray-600">Memuat data buku...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-600 border border-red-200 bg-red-50 rounded-lg">
        <p className="font-semibold">{error}</p>
        <button
          onClick={() => fetchBooks(currentPage)}
          className="mt-3 px-3 py-1 text-sm bg-red-100 rounded hover:bg-red-200"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* ... Header dan Tombol Tambah Buku ... */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Kelola Buku ({totalItems} Total)
        </h2>

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-150"
          onClick={() => alert("Fitur Tambah Buku akan datang!")}
        >
          + Tambah Buku Baru
        </button>
      </div>

      {/* Tabel Daftar Buku */}
      {/* Tampilkan loading spinner kecil jika sedang fetch, dan blur tabel */}
      {loading && totalItems > 0 && (
        <div className="flex justify-center py-2 text-indigo-600">
          <SpinnerAnimate size="5" color="indigo" />
        </div>
      )}

      <div
        className="bg-white shadow-lg rounded-lg overflow-x-auto mb-4"
        style={{
          opacity: loading && totalItems > 0 ? 0.7 : 1,
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {/* ... Table Headers ... */}
            <tr>
              {headerItems.map((item, idx) => (
                <BookTableHeaderItems
                  key={`book-header-table-${idx}`}
                  label={item}
                />
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.publishedYear}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-indigo-600">
                  {book.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {books.length === 0 && !loading && (
          <p className="text-center py-4 text-gray-500">
            Tidak ada buku untuk ditampilkan.
          </p>
        )}
      </div>

      {/* KOMPONEN PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages} // Menggunakan totalPages yang dihitung dari totalItems
        goToPage={goToPage}
      />
    </div>
  );
};

export default BookManagementPage;
