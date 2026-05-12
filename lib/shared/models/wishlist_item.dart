class WishlistItem {
  const WishlistItem({required this.title, required this.price, required this.progress, this.reservedBy});
  final String title;
  final double price;
  final double progress;
  final String? reservedBy;

  bool isVisibleReservation({required bool isOwner}) => !isOwner;
}
