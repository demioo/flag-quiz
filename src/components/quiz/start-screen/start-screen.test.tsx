import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StartScreen } from "./start-screen";

describe("StartScreen", () => {
  const mockHandleStart = jest.fn();

  beforeEach(() => {
    mockHandleStart.mockClear();
  });

  it("renders the title and description", () => {
    render(<StartScreen handleStart={mockHandleStart} />);

    expect(screen.getByText("World Flags Quiz")).toBeInTheDocument();
    expect(
      screen.getByText("Test your knowledge of flags from around the world!")
    ).toBeInTheDocument();
  });

  it("renders 'All Flags' button", () => {
    render(<StartScreen handleStart={mockHandleStart} />);

    expect(
      screen.getByRole("button", { name: "All Flags" })
    ).toBeInTheDocument();
  });

  it("renders Africa button", () => {
    render(<StartScreen handleStart={mockHandleStart} />);

    expect(screen.getByRole("button", { name: "Africa" })).toBeInTheDocument();
  });

  it("renders Asia button", () => {
    render(<StartScreen handleStart={mockHandleStart} />);

    expect(screen.getByRole("button", { name: "Asia" })).toBeInTheDocument();
  });

  it("renders Europe button", () => {
    render(<StartScreen handleStart={mockHandleStart} />);

    expect(screen.getByRole("button", { name: "Europe" })).toBeInTheDocument();
  });

  it("renders North America button", () => {
    render(<StartScreen handleStart={mockHandleStart} />);

    expect(
      screen.getByRole("button", { name: "North America" })
    ).toBeInTheDocument();
  });

  it("renders Oceania button", () => {
    render(<StartScreen handleStart={mockHandleStart} />);

    expect(screen.getByRole("button", { name: "Oceania" })).toBeInTheDocument();
  });

  it("renders South America button", () => {
    render(<StartScreen handleStart={mockHandleStart} />);

    expect(
      screen.getByRole("button", { name: "South America" })
    ).toBeInTheDocument();
  });

  it("calls handleStart with no arguments when 'All Flags' is clicked", async () => {
    const user = userEvent.setup();
    render(<StartScreen handleStart={mockHandleStart} />);

    await user.click(screen.getByRole("button", { name: "All Flags" }));

    expect(mockHandleStart).toHaveBeenCalledTimes(1);
    expect(mockHandleStart).toHaveBeenCalledWith();
  });

  it("calls handleStart with 'Africa' when Africa button is clicked", async () => {
    const user = userEvent.setup();
    render(<StartScreen handleStart={mockHandleStart} />);

    await user.click(screen.getByRole("button", { name: "Africa" }));

    expect(mockHandleStart).toHaveBeenCalledTimes(1);
    expect(mockHandleStart).toHaveBeenCalledWith({ continent: "Africa" });
  });

  it("calls handleStart with 'Asia' when Asia button is clicked", async () => {
    const user = userEvent.setup();
    render(<StartScreen handleStart={mockHandleStart} />);

    await user.click(screen.getByRole("button", { name: "Asia" }));

    expect(mockHandleStart).toHaveBeenCalledTimes(1);
    expect(mockHandleStart).toHaveBeenCalledWith({ continent: "Asia" });
  });

  it("calls handleStart with 'Europe' when Europe button is clicked", async () => {
    const user = userEvent.setup();
    render(<StartScreen handleStart={mockHandleStart} />);

    await user.click(screen.getByRole("button", { name: "Europe" }));

    expect(mockHandleStart).toHaveBeenCalledTimes(1);
    expect(mockHandleStart).toHaveBeenCalledWith({ continent: "Europe" });
  });

  it("calls handleStart with 'North America' when North America button is clicked", async () => {
    const user = userEvent.setup();
    render(<StartScreen handleStart={mockHandleStart} />);

    await user.click(screen.getByRole("button", { name: "North America" }));

    expect(mockHandleStart).toHaveBeenCalledTimes(1);
    expect(mockHandleStart).toHaveBeenCalledWith({
      continent: "North America",
    });
  });

  it("calls handleStart with 'Oceania' when Oceania button is clicked", async () => {
    const user = userEvent.setup();
    render(<StartScreen handleStart={mockHandleStart} />);

    await user.click(screen.getByRole("button", { name: "Oceania" }));

    expect(mockHandleStart).toHaveBeenCalledTimes(1);
    expect(mockHandleStart).toHaveBeenCalledWith({ continent: "Oceania" });
  });

  it("calls handleStart with 'South America' when South America button is clicked", async () => {
    const user = userEvent.setup();
    render(<StartScreen handleStart={mockHandleStart} />);

    await user.click(screen.getByRole("button", { name: "South America" }));

    expect(mockHandleStart).toHaveBeenCalledTimes(1);
    expect(mockHandleStart).toHaveBeenCalledWith({
      continent: "South America",
    });
  });
});
