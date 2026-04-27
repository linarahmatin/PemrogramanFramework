import { describe, it, expect, jest } from "@jest/globals"
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "@/components/layout/navbar";
import { useSession } from "next-auth/react";

// Mocking next-auth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mocking next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  },
}));

describe("Navbar Component", () => {
  it("should render sign in button when user is not authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Navbar />);

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });

  it("should render welcome message and user image when user is authenticated", () => {
    const mockUser = {
      fullname: "sesy",
      image: "/profile.png",
    };

    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: mockUser,
      },
      status: "authenticated",
    });

    render(<Navbar />);

    expect(screen.getByText(/welcome, sesy/i)).toBeInTheDocument();

    const userImage = screen.getByAltText(/sesy/i);
    expect(userImage).toBeInTheDocument();
    expect(userImage).toHaveAttribute("src", "/profile.png");

    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();
  });

  it("should check if branding title element exists for Script injection", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<Navbar />);

    // Menggunakan query selektor yang lebih aman di RTL
    const brandDiv = document.getElementById("title");
    expect(brandDiv).toBeInTheDocument();
  });
});