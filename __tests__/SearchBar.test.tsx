import { render, fireEvent, screen } from "@testing-library/react"
import SearchBar from "@/components/SearchBar"
import { describe, it, expect } from "@jest/globals"
import { jest } from "@jest/globals"

describe("SearchBar", () => {
  it("renders correctly", () => {
    const mockOnSearch = jest.fn()
    render(<SearchBar onSearch={mockOnSearch} />)

    expect(screen.getByPlaceholderText("Enter address, city, neighborhood, or ZIP")).toBeInTheDocument()
    expect(screen.getByText("Search")).toBeInTheDocument()
    expect(screen.getByLabelText("Min Price")).toBeInTheDocument()
    expect(screen.getByLabelText("Max Price")).toBeInTheDocument()
    expect(screen.getByLabelText("Bedrooms")).toBeInTheDocument()
  })

  it("calls onSearch with correct filters when search button is clicked", () => {
    const mockOnSearch = jest.fn()
    render(<SearchBar onSearch={mockOnSearch} />)

    fireEvent.change(screen.getByPlaceholderText("Enter address, city, neighborhood, or ZIP"), {
      target: { value: "New York" },
    })
    fireEvent.change(screen.getByLabelText("Min Price"), { target: { value: "1000" } })
    fireEvent.change(screen.getByLabelText("Max Price"), { target: { value: "5000" } })
    fireEvent.change(screen.getByLabelText("Bedrooms"), { target: { value: "2" } })

    fireEvent.click(screen.getByText("Search"))

    expect(mockOnSearch).toHaveBeenCalledWith({
      searchTerm: "New York",
      minPrice: 1000,
      maxPrice: 5000,
      bedrooms: 2,
    })
  })
})

